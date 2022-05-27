import { loadPackageJsonFiles } from "../load";

it("Loads the package.json files", async () => {
  const results = await loadPackageJsonFiles();
  expect(results).toMatchInlineSnapshot(`
      Object {
        "backend": Object {
          "dependencies": undefined,
          "devDependencies": Object {
            "firebase-functions-test": "^2.1.0",
          },
        },
        "common": Object {
          "dependencies": undefined,
          "devDependencies": Object {
            "@types/jest": "^27.4.1",
            "@typescript-eslint/eslint-plugin": "^5.22.0",
            "@typescript-eslint/parser": "^5.22.0",
            "eslint": "^8.14.0",
            "eslint-config-google": "^0.14.0",
            "eslint-config-prettier": "^8.5.0",
            "eslint-plugin-jest": "^26.1.5",
            "eslint-plugin-prettier": "^4.0.0",
            "eslint-plugin-react": "^7.29.4",
            "firebase": "^9.8.1",
            "firebase-functions": "^3.21.2",
            "jest": "^28.1.0",
            "opener": "^1.5.2",
            "prettier": "^2.6.2",
            "typescript": "^4.6.4",
            "webpack-bundle-analyzer": "^4.5.0",
          },
        },
        "frontend": Object {
          "dependencies": Object {
            "react": "^18.1.0",
            "react-dom": "^18.1.0",
            "web-vitals": "^2.1.4",
          },
          "devDependencies": Object {
            "@testing-library/dom": "^8.13.0",
            "@testing-library/jest-dom": "^5.16.4",
            "@testing-library/react": "^13.1.1",
            "@testing-library/react-hooks": "^8.0.0",
            "@testing-library/user-event": "^14.1.1",
            "@types/node": "^16.11.33",
            "@types/react": "^18.0.8",
            "@types/react-dom": "^18.0.3",
            "autoprefixer": "^10.4.7",
            "eslint-plugin-react-hooks": "^4.5.0",
            "postcss": "^8.4.13",
            "react-scripts": "5.0.1",
            "tailwindcss": "^3.0.24",
          },
        },
      }
    `);
});
