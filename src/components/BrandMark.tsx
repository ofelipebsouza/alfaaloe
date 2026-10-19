import { Leaf } from 'lucide-react';
import { BRAND } from '../lib/brand';

/** Existing provisional signature. Official artwork is configured in lib/brand.ts. */
export default function BrandMark({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  return <span className={`aa-logo aa-brand-mark ${className}`}>
    {BRAND.logo ? <img className="aa-official-logo" src={BRAND.logo.src} alt={BRAND.logo.alt} width={BRAND.logo.width} height={BRAND.logo.height} /> : <>
      <span className="aa-logo-icon" aria-hidden="true"><Leaf size={25} strokeWidth={1.5} /></span>
      <span>alfa<span className="aa-logo-light">aloe</span>{!compact && <small>{BRAND.descriptor}</small>}</span>
    </>}
  </span>;
}
