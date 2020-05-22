"use strict";

const compress = new Compress();
const output = document.getElementById("output");

const upload = document.getElementById("upload");

upload.addEventListener(
  "change",
  (evt) => {
    const files = [...evt.target.files];
    output.innerHTML = `Compressing ${files.length} files... Please wait`;
    compress
      .compress(files, {
        size: 4, // the max size in MB, defaults to 2MB
        quality: 0.75, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
      })
      .then((images) => {
        const arr = images.map((img) => {
          const {
            endSizeInMb,
            initialSizeInMb,
            iterations,
            sizeReducedInPercent,
            elapsedTimeInSeconds,
            alt,
          } = img;

          return `
<a href="${img.prefix}${img.data}" download="${alt}"><img src="${img.prefix}${
            img.data
          }" alt="${alt}"/></a>
<p>
  <b>Start Size:</b> ${filesize(initialSizeInMb * 1000000)} <br/>
  <b>End Size:</b> ${filesize(endSizeInMb * 1000000)} <br/>
  <b>Compression Cycles:</b> ${iterations} <br/>
  <b>Size Reduced:</b> ${sizeReducedInPercent} % <br/>
  <b>File Name:</b> ${alt}
</p>`;
        });
        output.innerHTML = arr.join(" ");
      });
  },
  false
);
