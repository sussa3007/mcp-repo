import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        },
        purple: {
          DEFAULT: "#8c52ff",
          light: "#a87fff",
          dark: "#7142cc"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem"
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px"
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: "rgb(161 161 170)",
            "code::before": {
              content: '""'
            },
            "code::after": {
              content: '""'
            },
            h1: {
              fontSize: "2rem",
              marginTop: "0.5em",
              marginBottom: "0.5em",
              color: "rgb(250 250 250)"
            },
            h2: {
              fontSize: "1.5rem",
              marginTop: "1.5em",
              marginBottom: "0.5em",
              color: "rgb(250 250 250)"
            },
            h3: {
              fontSize: "1.25rem",
              marginTop: "1.5em",
              marginBottom: "0.5em",
              color: "rgb(250 250 250)"
            },
            img: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
              display: "inline-block"
            },
            a: {
              color: "#8c52ff",
              textDecoration: "none",
              "&:hover": {
                color: "#a87fff"
              }
            },
            p: {
              marginTop: "0.75em",
              marginBottom: "0.75em"
            },
            pre: {
              backgroundColor: "rgb(9 9 11)",
              color: "rgb(161 161 170)",
              padding: "1rem",
              borderRadius: "0.375rem",
              marginTop: "1em",
              marginBottom: "1em"
            },
            code: {
              color: "rgb(161 161 170)",
              backgroundColor: "rgb(39 39 42)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25em",
              fontSize: "0.875em"
            },
            strong: {
              color: "rgb(250 250 250)"
            }
          }
        },
        invert: {
          css: {
            "--tw-prose-body": "rgb(161 161 170)",
            "--tw-prose-headings": "rgb(250 250 250)",
            "--tw-prose-links": "#8c52ff",
            "--tw-prose-links-hover": "#a87fff",
            "--tw-prose-underline": "#8c52ff",
            "--tw-prose-underline-hover": "#a87fff",
            "--tw-prose-bold": "rgb(250 250 250)",
            "--tw-prose-counters": "rgb(161 161 170)",
            "--tw-prose-bullets": "rgb(161 161 170)",
            "--tw-prose-hr": "rgb(39 39 42)",
            "--tw-prose-quote-borders": "rgb(39 39 42)",
            "--tw-prose-captions": "rgb(161 161 170)",
            "--tw-prose-code": "rgb(161 161 170)",
            "--tw-prose-code-bg": "rgb(39 39 42)",
            "--tw-prose-pre-code": "rgb(161 161 170)",
            "--tw-prose-pre-bg": "rgb(9 9 11)",
            "--tw-prose-pre-border": "rgb(39 39 42)",
            "--tw-prose-th-borders": "rgb(39 39 42)",
            "--tw-prose-td-borders": "rgb(39 39 42)"
          }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
} satisfies Config;
