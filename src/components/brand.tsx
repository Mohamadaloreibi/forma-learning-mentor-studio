import lightLogo from "@/assets/lerafy-logo-light.asset.json";
import darkLogo from "@/assets/lerafy-logo-dark.asset.json";
import symbol from "@/assets/lerafy-symbol.asset.json";

export function BrandLogo({ dark }: { dark?: boolean }) {
  if (dark === undefined) {
    return (
      <span className="brand-logo-adaptive">
        <img
          className="brand-logo logo-on-light"
          src={lightLogo.url}
          width={842}
          height={202}
          alt="Lerafy"
        />
        <img
          className="brand-logo logo-on-dark"
          src={darkLogo.url}
          width={842}
          height={202}
          alt="Lerafy"
        />
      </span>
    );
  }
  return (
    <img
      className="brand-logo"
      src={dark ? darkLogo.url : lightLogo.url}
      width={842}
      height={202}
      alt="Lerafy"
    />
  );
}

export function BrandSymbol({ small = false }: { small?: boolean }) {
  return (
    <img
      className={small ? "brand-symbol small" : "brand-symbol"}
      src={symbol.url}
      width={195}
      height={202}
      alt=""
      aria-hidden="true"
    />
  );
}
