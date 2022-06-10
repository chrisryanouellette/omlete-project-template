export type PackageNames = "common" | "frontend" | "backend";

export type Dependencies<T = string> = {
  devDependencies?: Record<string, T>;
  dependencies?: Record<string, T>;
};

export type PackageJson = Record<PackageNames, Dependencies>;

export type NpmPackageResponse = {
  collected: {
    metadata: {
      name: string;
      version: string;
      repository: {
        type: string;
        url: string;
      };
      links: {
        npm: string;
      };
    };
  };
};

export type NpmPackage = Record<
  PackageNames,
  Dependencies<{ version: string; npm: string; url: string }>
>;

export type NpmComparison = Record<
  PackageNames,
  Dependencies<{ major: boolean; minor: boolean; patch: boolean }>
>;
