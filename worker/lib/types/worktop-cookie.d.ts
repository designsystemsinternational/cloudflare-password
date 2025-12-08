declare module "worktop/cookie" {
  export interface Attributes {
    maxage?: number;
    expires?: Date;
    sameSite?: "Lax" | "Strict" | "None";
    secure?: boolean;
    httpOnly?: boolean;
    domain?: string;
    path?: string;
  }

  export function parse(cookie: string): Attributes & Record<string, string>;
  export function stringify(
    name: string,
    value: string,
    options?: Omit<Attributes, "expires"> & { expires?: Date | number | string }
  ): string;
}
