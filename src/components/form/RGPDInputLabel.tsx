import Link from "next/link";

export default function RGPDInputLabel({ error }: { error?: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="rgpd"
          name="rgpd"
          className="w-4 h-4 border-text-secondary"
          required={true}
        />
        <label htmlFor="rgpd" className="text-sm">
          J&apos;accepte avoir pris connaissance de la{" "}
          <Link
            href="/politique-confidentialite"
            className="text-midnight-green hover:underline"
          >
            politique de confidentialité
          </Link>{" "}
          de ce site
        </label>
      </div>

      {error && <i className="block mt-2 text-red-500 text-sm">{error}</i>}
    </div>
  );
}
