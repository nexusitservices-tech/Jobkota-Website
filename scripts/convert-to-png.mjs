import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const servicesDir = path.resolve('public/services');
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.svg'));

console.log(`Found ${files.length} SVG files to convert to PNG in ${servicesDir}...`);

for (const file of files) {
  const svgPath = path.join(servicesDir, file);
  const pngPath = path.join(servicesDir, file.replace(/\.svg$/, '.png'));
  
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  const resvg = new Resvg(svgContent, {
    fitTo: {
      mode: 'width',
      value: 1200, // High-resolution 1200x900 PNG
    },
  });
  
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  
  fs.writeFileSync(pngPath, pngBuffer);
  console.log(`Converted ${file} -> ${path.basename(pngPath)} (${pngBuffer.length} bytes, ${pngData.width}x${pngData.height})`);
}

console.log('All PNG conversions completed successfully!');
