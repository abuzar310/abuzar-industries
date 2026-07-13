# Local SEO Analysis — abuzarindustries.in

**Date:** 2026-07-13  
**Business:** Abuzar Industries — Timber & Wood Supplier  
**Location:** KSSIDC Industrial Area, DVG Road, Chitradurga, Karnataka 577501  
**Phone:** +91 98453 78626  
**Email:** abuzarindustries@gmail.com  
**Website:** https://abuzarindustries.in

---

## 1. Local SEO Score: 38/100

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| GBP Signals | 25% | 10/25 | No GBP embed, no reviews widget on site |
| Reviews & Reputation | 20% | 5/20 | No visible reviews, no aggregateRating schema |
| Local On-Page SEO | 20% | 15/20 | Good title/H1, NAP in footer, needs service pages |
| NAP Consistency | 15% | 12/15 | NAP present but missing from schema |
| Local Schema Markup | 10% | 0/10 | **Missing entirely** — no LocalBusiness schema |
| Local Link Authority | 10% | 6/10 | No visible citations, chamber/BBB signals |

---

## 2. Business Type

**✅ Detected: Hybrid (Brick-and-Mortar + Delivery)**
- Physical yard: KSSIDC Industrial Area, Chitradurga ✅
- Delivery area: "Across Karnataka" ✅
- Correct treatment: LocalBusiness with both `address` and `areaServed`

---

## 3. Industry Vertical

**✅ Home Services / Construction Supply**
- Keywords: teak, timber, wood supplier, custom cutting
- Schema type: `HomeGoodsStore` or `Store` (LocalBusiness subtype)

---

## 4. What's Already Good ✅

| Factor | Status |
|--------|--------|
| Title tag with city | ✅ "Abuzar Industries — Best Teak Wood Supplier in Chitradurga" |
| Meta description | ✅ "Trusted timber supplier in Chitradurga since 1995…" |
| Keywords array | ✅ 8 relevant local keywords |
| Canonical URL | ✅ `https://abuzarindustries.in` |
| OpenGraph tags | ✅ Complete with image |
| NAP in footer | ✅ Address, phone, email visible |
| `tel:` links | ✅ Click-to-call throughout |
| WhatsApp CTA | ✅ Prominent, above the fold |
| Mobile-friendly | ✅ Next.js responsive |
| Page speed | ✅ Static SSG, fast load |
| Kannada coverage | ✅ Serves Chitradurga (Kannada region) |

---

## 5. Critical Issues ❌

### Issue 1: No LocalBusiness Schema (CRITICAL)
No JSON-LD structured data exists. This means Google can't automatically extract your address, phone, hours, or reviews for rich results.

### Issue 2: No Google Business Profile Integration (CRITICAL)
No GBP embed, no reviews widget, no place ID reference on the site. This is the #1 local ranking signal.

### Issue 3: No Reviews Visible (HIGH)
No Google reviews, no aggregateRating schema, no testimonial block. 74% of consumers only care about last 3 months of reviews.

### Issue 4: No Dedicated Service Pages (HIGH)
All services (teak, white teak, neem, cutting, delivery) are on ONE page as cards. Google prefers dedicated per-service pages.

---

## 6. Top 10 Prioritized Actions

| # | Priority | Action | Effort |
|---|----------|--------|--------|
| 1 | 🔴 Critical | Add LocalBusiness JSON-LD schema to layout.tsx | 10 min |
| 2 | 🔴 Critical | Claim & optimize Google Business Profile | 30 min |
| 3 | 🔴 Critical | Add opening hours to footer | 5 min |
| 4 | 🟠 High | Create service pages (teak, white teak, neem) | 45 min |
| 5 | 🟠 High | Add review solicitation & aggregateRating schema | 20 min |
| 6 | 🟠 High | Add Google Maps embed to contact page | 10 min |
| 7 | 🟡 Medium | Claim Apple Business Connect + Bing Places | 15 min |
| 8 | 🟡 Medium | Add geo coordinates to schema | 5 min |
| 9 | 🟡 Medium | Add FAQ schema with timber questions | 15 min |
| 10 | 🟢 Low | Submit to data aggregators (Data Axle, Foursquare) | 20 min |

---

## 7. Quick Wins (implement now)

1. **Add LocalBusiness schema** → layout.tsx (below metadata)
2. **Add opening hours** → to the contact section
3. **Add geo coordinates** → schema (14.2265, 76.3863)
4. **Add Maps embed** → contact page
5. **Add meta for service pages** → teak, white teak, neem as separate routes
