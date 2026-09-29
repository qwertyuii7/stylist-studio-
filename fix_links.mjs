import fs from 'fs';

const paths = ['src/app/page.tsx', 'src/app/signature/page.tsx'];
paths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/href="\/services"/g, 'href="/explore"');
    content = content.replace(/href="\/curators"/g, 'href="/explore"');
    content = content.replace(/href="\/book"/g, 'href="/explore"');
    fs.writeFileSync(p, content);
    console.log('Fixed links in', p);
  }
});
