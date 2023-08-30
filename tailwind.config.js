module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      strokeWidth: {
        5: "5px",
      },
      fontFamily: {
        arvo: ["Arvo", "serif"],
        fira: ["Fira Code", "monospace"],
        robo: ["Roboto", "sans-serif"],
        cond: ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
