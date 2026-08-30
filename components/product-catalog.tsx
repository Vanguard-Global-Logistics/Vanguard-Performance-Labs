"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Search, SlidersHorizontal } from "lucide-react";
import type { Compound } from "@/types";
import { cartEligible } from "@/types";
import { publicProductName } from "@/lib/public-product-name";
import { ProductPurchase } from "@/components/product-purchase";
import { VialComposite } from "@/components/vial-composite";
import { EvidenceTag } from "@/components/ui";

export function ProductCatalog({ compounds }: { compounds: Compound[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(compounds.map((item) => item.category))).sort()],
    [compounds],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return compounds.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const haystack = [publicProductName(item), item.name, item.category, ...item.aliases].join(" ").toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [category, compounds, query]);

  return (
    <section className="catalog-experience">
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={17} aria-hidden />
          <span className="sr-only">Search research products</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search compound, alias, or category"
          />
        </label>
        <div className="catalog-count" aria-live="polite">
          <SlidersHorizontal size={15} /> {visible.length} of {compounds.length} materials
        </div>
      </div>

      <div className="catalog-categories" role="group" aria-label="Filter by research category">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={item === category}
            className={item === category ? "is-active" : ""}
          >
            {item}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="catalog-empty">
          <h2>No matching research material</h2>
          <p>Try another compound name, alias, or research category.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Reset filters</button>
        </div>
      ) : (
        <div className="catalog-grid">
          {visible.map((compound) => {
            const orderable = cartEligible(compound.regulatory) && !!compound.variants?.length;
            const displaySize = compound.variants?.[0]?.size ?? compound.availableSizes?.[0] ?? compound.strength ?? "Research vial";
            const displayName = publicProductName(compound);
            return (
              <article key={compound.slug} className="catalog-card">
                <div className="catalog-card__topline">
                  <span>{compound.category}</span>
                  <EvidenceTag level={compound.evidence} />
                </div>

                {orderable && compound.variants ? (
                  <ProductPurchase slug={compound.slug} name={displayName} variants={compound.variants} />
                ) : (
                  <div className="catalog-quote-visual">
                    <VialComposite slug={compound.slug} name={displayName} size={displaySize} width={150} />
                    <div>
                      <span>Professional sourcing</span>
                      <strong>{displaySize}</strong>
                      <p>Availability and pricing are reviewed for qualified business accounts.</p>
                    </div>
                  </div>
                )}

                <div className="catalog-card__body">
                  <h2>{displayName}</h2>
                  <p>{compound.overview}</p>
                  <div className="catalog-card__links">
                    <Link href={`/products/${compound.slug}`}>
                      Product details <ArrowRight size={14} />
                    </Link>
                    <Link href={`/education/${compound.slug}`}>
                      <FileText size={14} /> Research overview
                    </Link>
                  </div>
                  {!orderable && (
                    <Link className="catalog-quote-button" href={`/products/${compound.slug}?action=quote_only`}>
                      Request availability
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
