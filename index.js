const $ = document.getElementById.bind(document);

async function f() {
  // fetch a chunked response to test the reader
  const size = 102400;
  const res = await fetch("https://httpbin.org/stream-bytes/" + size);
  let total = 0;
  console.table(res.headers);
  const reader = res.body.getReader();
  while (true) {
    // done is true for the last chunk
    // value is Uint8Array of the chunk bytes
    const { done, value } = await reader.read();
    if (done) break;
    console.log(`Received ${value.length} bytes`);
    total += value.length;
    console.log(`Total ${total} bytes`);
    const progress = Math.round((total / size) * 100) + "%";
    $("progress").style.width = progress;
    $("progress").innerText = progress;
  }
  console.log(total);
}

$("btn").addEventListener("click", f);
