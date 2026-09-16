const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateResume(outputPath) {
  // Letter size is 612 x 792 points
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: {
      top: 36,
      bottom: 36,
      left: 38,
      right: 38
    },
    info: {
      Title: 'YESURUN A — Resume',
      Author: 'YESURUN A',
      Subject: 'Full Stack Developer Resume',
      Keywords: 'Full Stack Developer, React.js, Node.js, Express.js, PostgreSQL, Java, Portfolio',
      Creator: 'YESURUN A Portfolio',
      Producer: 'PDFKit'
    }
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  const leftMargin = 38;
  const rightMargin = 612 - 38;
  const contentWidth = rightMargin - leftMargin;

  // ── HEADER ──
  doc.font('Times-Bold').fontSize(22).fillColor('#000000').text('YESURUN A', { align: 'center' });
  doc.moveDown(0.12);
  doc.font('Times-Roman').fontSize(11.5).text('Full Stack Developer', { align: 'center' });
  doc.moveDown(0.2);

  // Contact line with interactive PDF links
  const contactY = doc.y;
  const phoneText = '+91 98434 41978';
  const emailText = 'yesurun893@gmail.com';
  const linkedinText = 'linkedin.com/in/yesurun02';
  const githubText = 'github.com/YESURUN10';
  const portfolioText = 'Portfolio';

  doc.font('Times-Roman').fontSize(9.5);
  
  // Calculate widths to center the whole line
  const sep = ' | ';
  const wPhone = doc.widthOfString(phoneText);
  const wEmail = doc.widthOfString(emailText);
  const wLinkedin = doc.widthOfString(linkedinText);
  const wGithub = doc.widthOfString(githubText);
  const wPortfolio = doc.widthOfString(portfolioText);
  const wSep = doc.widthOfString(sep);

  const totalContactWidth = wPhone + wSep + wEmail + wSep + wLinkedin + wSep + wGithub + wSep + wPortfolio;
  let curX = (612 - totalContactWidth) / 2;

  // Phone
  doc.text(phoneText, curX, contactY, { link: 'tel:+919843441978' });
  curX += wPhone;
  doc.text(sep, curX, contactY);
  curX += wSep;

  // Email
  doc.text(emailText, curX, contactY, { link: 'mailto:yesurun893@gmail.com' });
  curX += wEmail;
  doc.text(sep, curX, contactY);
  curX += wSep;

  // LinkedIn
  doc.text(linkedinText, curX, contactY, { link: 'https://linkedin.com/in/yesurun02', underline: true });
  curX += wLinkedin;
  doc.text(sep, curX, contactY);
  curX += wSep;

  // GitHub
  doc.text(githubText, curX, contactY, { link: 'https://github.com/YESURUN10', underline: true });
  curX += wGithub;
  doc.text(sep, curX, contactY);
  curX += wSep;

  // Portfolio
  doc.text(portfolioText, curX, contactY, { link: 'https://linkedin.com/in/yesurun02', underline: true });

  doc.y = contactY + 14;

  // ── SECTION HEADER HELPER ──
  function addSection(title) {
    doc.moveDown(0.28);
    const startY = doc.y;
    doc.font('Times-Bold').fontSize(10.5).fillColor('#000000').text(title.toUpperCase(), leftMargin, startY);
    const lineY = doc.y + 1;
    doc.moveTo(leftMargin, lineY).lineTo(rightMargin, lineY).lineWidth(0.6).strokeColor('#000000').stroke();
    doc.y = lineY + 4;
  }

  // ── TWO-COLUMN ROW HELPER ──
  function addRow(leftBold, rightBold, leftItalic, rightItalic) {
    const y1 = doc.y;
    doc.font('Times-Bold').fontSize(9.5).text(leftBold, leftMargin, y1, { width: contentWidth - 120, lineBreak: false });
    doc.font('Times-Bold').fontSize(9.5).text(rightBold, leftMargin, y1, { width: contentWidth, align: 'right' });

    if (leftItalic || rightItalic) {
      const y2 = doc.y;
      doc.font('Times-Italic').fontSize(9).text(leftItalic || '', leftMargin, y2, { width: contentWidth - 90, lineBreak: false });
      doc.font('Times-Italic').fontSize(9).text(rightItalic || '', leftMargin, y2, { width: contentWidth, align: 'right' });
    }
  }

  // ── BULLET HELPER ──
  function addBullet(bulletText) {
    const bulletIndent = leftMargin + 11;
    const y = doc.y + 1;
    doc.font('Times-Roman').fontSize(9).text('•', leftMargin + 3, y);
    doc.font('Times-Roman').fontSize(9).text(bulletText, bulletIndent, y, {
      width: rightMargin - bulletIndent,
      align: 'left',
      lineGap: 1.2
    });
  }

  // 1. EDUCATION
  addSection('Education');
  addRow(
    'Panimalar Engineering College, Anna University',
    'Chennai, India',
    'B.Tech in Information Technology | CGPA: 8.40/10 (up to Sem VI)',
    '2023 – 2027'
  );
  doc.moveDown(0.2);
  addRow(
    'Jayarrajesh Matric HR Sec School',
    'Tamil Nadu, India',
    'Higher Secondary Certificate (HSC) | Score: 84.8%',
    '2023'
  );

  // 2. SKILLS
  addSection('Skills');
  const skillsData = [
    { label: 'Programming Languages', val: 'Java, JavaScript (ES6+), SQL' },
    { label: 'Frontend', val: 'React.js, HTML5, CSS3, Tailwind CSS, Vite' },
    { label: 'Backend', val: 'Node.js, Express.js, REST APIs' },
    { label: 'Databases', val: 'PostgreSQL, MongoDB, Firebase' },
    { label: 'Tools', val: 'Git, GitHub, Postman' }
  ];

  skillsData.forEach(item => {
    const y = doc.y + 0.8;
    doc.font('Times-Bold').fontSize(9).text(item.label + ': ', leftMargin, y, { continued: true });
    doc.font('Times-Roman').fontSize(9).text(item.val);
  });

  // 3. EXPERIENCE
  addSection('Experience');

  // Job 1
  addRow(
    'AK Infopark Private Limited',
    'Nagercoil, India',
    'Full Stack Web Developer Intern',
    'June 2025'
  );
  addBullet('Built responsive React.js components integrated with Firebase Authentication and Realtime Database, delivering functional UI modules on schedule.');
  addBullet('Resolved UI/UX issues across the application, improving responsiveness and cross-device compatibility in collaboration with the dev team.');

  doc.moveDown(0.2);

  // Job 2
  addRow(
    'Infomatrics Project Services',
    'Chennai, India',
    'Full Stack Web Developer Intern',
    'June 2024 – July 2024'
  );
  addBullet('Developed full-stack modules using React.js on the frontend and Node.js/Express.js for REST API development, contributing to timely project delivery.');
  addBullet('Handled end-to-end workflow covering UI development, API integration, and cross-layer debugging across the application.');

  // 4. PROJECTS
  addSection('Projects');

  // Project 1
  const p1Y = doc.y + 0.8;
  doc.font('Times-Bold').fontSize(9.5).text('Nexz', leftMargin, p1Y, { continued: true });
  doc.font('Times-Roman').fontSize(9.5).text(' | ', { continued: true });
  doc.font('Times-Italic').fontSize(9).text('React.js, Node.js, Groq API (LLaMA 3), NewsAPI, Firebase Auth');
  addBullet('Built a real-time news intelligence platform using Groq LLaMA 3 API to identify and map causal connections between global events via a Node.js backend.');
  addBullet('Integrated React Flow for interactive event-link graph visualization and Firebase Auth for personalized user news feeds.');

  doc.moveDown(0.2);

  // Project 2
  const p2Y = doc.y + 0.8;
  doc.font('Times-Bold').fontSize(9.5).text('Musify', leftMargin, p2Y, { continued: true });
  doc.font('Times-Roman').fontSize(9.5).text(' | ', { continued: true });
  doc.font('Times-Italic').fontSize(9).text('React.js, Firebase, Tailwind CSS');
  addBullet('Developed a music streaming platform with Firebase Authentication, Realtime Database for persistent playlist management, and audio playback.');
  addBullet('Implemented React.js state management for real-time audio playback, playlist handling, and responsive user interactions across devices.');

  doc.moveDown(0.2);

  // Project 3
  const p3Y = doc.y + 0.8;
  doc.font('Times-Bold').fontSize(9.5).text('SynthChef', leftMargin, p3Y, { continued: true });
  doc.font('Times-Roman').fontSize(9.5).text(' | ', { continued: true });
  doc.font('Times-Italic').fontSize(9).text('React.js, Node.js, Express.js, PostgreSQL');
  addBullet('Built a full-stack recipe discovery platform with dynamic search and filtering by cuisine and cook time, backed by a structured PostgreSQL relational database.');
  addBullet('Designed a RESTful Express.js API integrated with a third-party food API, enabling scalable content delivery with a clean backend architecture.');

  // 5. ACHIEVEMENTS
  addSection('Achievements');

  const ach1Y = doc.y + 0.8;
  doc.font('Times-Bold').fontSize(9).text('SVEEP District Award', leftMargin, ach1Y, { continued: true });
  doc.font('Times-Roman').fontSize(9).text(' | Recognized by the District Collector, Tiruvallur for Best Short Film at the State Election Awareness Competition');

  const ach2Y = doc.y + 1.5;
  doc.font('Times-Bold').fontSize(9).text('Problem Solving', leftMargin, ach2Y, { continued: true });
  doc.font('Times-Roman').fontSize(9).text(' | Solved 135+ DSA problems on LeetCode covering Arrays, Strings, Hashing, Linked Lists, and OOP concepts');

  // 6. CERTIFICATIONS
  addSection('Certifications');

  const certs = [
    { title: 'Database Management Systems', org: 'NPTEL' },
    { title: 'Java & Modern Web Development', org: 'Infosys Springboard' },
    { title: 'Gemini Certified Student', org: 'Google' }
  ];

  certs.forEach(c => {
    const y = doc.y + 0.8;
    doc.font('Times-Bold').fontSize(9).text(c.title, leftMargin, y, { continued: true });
    doc.font('Times-Roman').fontSize(9).text(' | ', { continued: true });
    doc.font('Times-Italic').fontSize(9).text(c.org);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
}

const publicPath = path.join(__dirname, '..', 'public', 'YESURUN_A_Resume.pdf');
generateResume(publicPath).then(() => {
  console.log('PDF generated at public:', publicPath);
  // Also copy to dist if dist exists
  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'YESURUN_A_Resume.pdf');
    fs.copyFileSync(publicPath, distPath);
    console.log('PDF copied to dist:', distPath);
  }
}).catch(err => {
  console.error('Error generating resume:', err);
  process.exit(1);
});
