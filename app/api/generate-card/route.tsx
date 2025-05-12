/* eslint-disable @typescript-eslint/no-explicit-any */
import chromium from "@sparticuz/chromium-min";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";

export const dynamic = "force-dynamic";

// Browser setup for Vercel serverless
const remoteExecutablePath = "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";
let browser: any = null;

async function getBrowser() {
  if (browser) return browser;

  if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
    browser = await puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(remoteExecutablePath),
      headless: true,
    });
  } else {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
  }
  return browser;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Get browser instance using serverless-compatible setup
    const browser = await getBrowser();
    const page = await browser.newPage();
    
    // Create HTML content with your BusinessCard component
    // We need to inline the component's rendering with the necessary data
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
        </head>
        <body>
          <div id="card" class="p-8">
            <!-- Recto -->
            <div class="w-[800px] h-[450px] bg-white shadow-xl rounded-lg py-8 px-12 flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <div class="flex justify-between items-center w-full">
                  <p class="text-gray-400 italic text-sm mb-2">${data.slogan_recto}</p>
                  <div class="flex items-center space-x-2">
                    <img
                      src="${data.logo}"
                      alt="logo"
                      width="150"
                      height="50"
                      class="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center">
                  <div>
                    <h1 class="text-3xl font-bold text-[#8b1432]">${data.name}</h1>
                    <p class="text-lg text-gray-700">${data.job}</p>
                  </div>
                  <div class="flex space-x-2 items-center">
                    ${data.partners_certifs.map((certif: string, idx: number) => 
                      `<img key="${idx}" src="${certif}" alt="partner-${idx}" width="40" height="40" class="object-contain" />`
                    ).join('')}
                  </div>
                </div>
                <div class="w-full h-[10px] bg-[#8b1432] my-4"></div>
              </div>

              <div class="flex justify-between items-center">
                <div class="space-y-3 text-gray-800">
                  <div class="flex items-center space-x-2">
                    <div class="p-[2.5px] border-2 border-[#8b1432] rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-[#8b1432]">
                        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p>${data.address}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="p-[2.5px] border-2 border-[#8b1432] rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-[#8b1432]">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                    </div>
                    <p>${data.email}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="p-[2.5px] border-2 border-[#8b1432] rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-[#8b1432]">
                        <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p>${data.phone}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="p-[2.5px] border-2 border-[#8b1432] rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-[#8b1432]">
                        <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                      </svg>
                    </div>
                    <p>${data.website}</p>
                  </div>
                </div>
                <div id="qrcode" class="w-32 h-32"></div>
              </div>
            </div>
            <!-- Verso -->
            <div class="w-[800px] h-[450px] bg-[#8b1432] shadow-xl rounded-lg py-8 px-12 flex flex-col justify-between mt-8">
              <div class="w-full h-full flex flex-col justify-center items-center">
                <img
                  src="${data.logo}"
                  alt="logo"
                  width="250"
                  height="100"
                  class="object-contain"
                />
                <p class="text-lg text-white mt-4">${data.slogan_verso}</p>
              </div>
            </div>
          </div>
          
          <script>
            // Generate vCard for QR code
            const vcardData = \`
BEGIN:VCARD
VERSION:3.0
N:${data.name.split(" ").reverse().join(";")};
FN:${data.name}
TITLE:${data.job}
TEL;TYPE=WORK,VOICE:${data.phone}
EMAIL:${data.email}
URL:${data.website}
ADR:;;${data.address};;;;
END:VCARD
            \`.trim();
            
            // Generate QR code using qrcode-generator
            const typeNumber = 0;
            const errorCorrectionLevel = 'L';
            const qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(vcardData);
            qr.make();
            
            document.getElementById('qrcode').innerHTML = qr.createImgTag(4);
          </script>
        </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Set viewport to match the card dimensions
    await page.setViewport({
      width: 850,
      height: 500,
      deviceScaleFactor: 2 // For higher resolution
    });

    // Take a screenshot of the card
    const cardElement = await page.$('#card');
    if (!cardElement) {
      throw new Error('Card element not found');
    }
    const screenshot = await cardElement.screenshot({
      type: 'png',
      omitBackground: true
    });

    // Don't close the browser to enable reuse
    // Just close the page
    await page.close();

    // Return the screenshot as a response
    return new Response(
      screenshot instanceof Buffer ? screenshot : Buffer.from(screenshot),
      {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'max-age=10'
        }
      }
    );
  } catch (err) {
    console.error(err);
    return new Response('Error generating business card: ' + (err instanceof Error ? err.message : 'Unknown error'), {
      status: 500
    });
  }
}
