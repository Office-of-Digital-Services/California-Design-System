export default {
  tags: ["components"],
  eleventyComputed: {
    title: (data) => data.page.filePathStem.split("/").pop(),
  },
};
