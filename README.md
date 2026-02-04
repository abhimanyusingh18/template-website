# Excel Academy - JEE & NEET Coaching Website Template

A modern, high-conversion landing website template for coaching centers offering JEE & NEET preparation. This template is designed to be easily customizable for different coaching institutes.

![Website Preview](images/hero/hero-bg-1.png)

## 📋 Table of Contents

- [Features](#-features)
- [Pages Included](#-pages-included)
- [Quick Start](#-quick-start)
- [Customization Guide](#-customization-guide)
- [FormSubmit Setup](#-formsubmit-setup)
- [Technology Stack](#-technology-stack)
- [Browser Support](#-browser-support)
- [Performance](#-performance)
- [License](#-license)

## ✨ Features

- ✅ **6 Fully Responsive Pages** - Homepage, About Us, Courses, Gallery, Contact, Results
- ✅ **Modern UI/UX** - Clean, professional design with smooth animations
- ✅ **Mobile-First Design** - Optimized for all devices (mobile, tablet, desktop)
- ✅ **Contact Forms** - Integrated with FormSubmit.co (no backend required)
- ✅ **Image Gallery** - Filterable gallery with lightbox functionality
- ✅ **SEO Optimized** - Proper meta tags, semantic HTML, and structured data
- ✅ **Fast Loading** - Optimized for performance with minimal dependencies
- ✅ **Easy to Customize** - CSS variables and clear code structure
- ✅ **No Framework Dependencies** - Pure HTML, CSS, and JavaScript

## 📄 Pages Included

1. **Homepage** (`index.html`)
   - Hero section with CTAs
   - Courses highlights
   - Why Choose Us section
   - Student results marquee
   - Testimonials slider
   - Contact form

2. **About Us** (`about.html`)
   - Institute overview
   - Mission & Vision
   - Faculty profiles
   - Teaching methodology
   - Journey timeline

3. **Courses** (`courses.html`)
   - JEE Main & Advanced details
   - NEET (UG) program
   - Foundation course (8-10)
   - Course features and CTAs

4. **Gallery** (`gallery.html`)
   - Filterable image gallery
   - Categories: Classrooms, Faculty, Students, Infrastructure
   - Lightbox with keyboard navigation

5. **Contact** (`contact.html`)
   - Contact information
   - Contact form with validation
   - Google Maps integration
   - Working hours

6. **Results** (`results.html`)
   - Success statistics
   - Top rankers showcase
   - Student testimonials
   - Parent testimonials

## 🚀 Quick Start

### 1. Download/Extract the Files

Extract the coaching-website folder to your desired location.

### 2. Open in Browser

Simply open `index.html` in your web browser to view the website locally.

### 3. Use a Local Server (Recommended)

For best results, use a local server:

**Using Python:**
```bash
cd coaching-website
python -m http.server 8000
```
Then visit: `http://localhost:8000`

**Using PHP:**
```bash
cd coaching-website
php -S localhost:8000
```
Then visit: `http://localhost:8000`

**Using VS Code Live Server:**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

## 🎨 Customization Guide

### 1. Updating Institute Name and Logo

**Update in all HTML files:**

Find and replace `Excel Academy` with your institute name:
```html
<!-- In navbar -->
<a href="index.html" class="navbar-logo">
    <span>🎓 Your Institute Name</span>
</a>
```

**To add your logo:**
1. Place your logo in the `assets/` folder as `logo.png`
2. Update the navbar in all HTML files:
```html
<a href="index.html" class="navbar-logo">
    <img src="assets/logo.png" alt="Your Institute">
    <span>Your Institute Name</span>
</a>
```

### 2. Changing Colors and Branding

Open `css/style.css` and edit the CSS variables (lines 14-88):

```css
:root {
  /* Update these colors to match your brand */
  --primary-color: #1e40af;      /* Main brand color */
  --secondary-color: #7c3aed;    /* Secondary color */
  --accent-color: #f59e0b;       /* Accent/CTA color */
  
  /* Font families */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### 3. Updating Contact Information

**Update in footer (all pages):**

Find the footer section and update:
```html
<div class="footer-section">
    <h4>Contact Us</h4>
    <p>📍 Your Address Here<br>City, State - PIN Code</p>
    <p>📞 +91 YOUR-PHONE-NUMBER</p>
    <p>✉️ your-email@domain.com</p>
    <p>🕐 Your Working Hours</p>
</div>
```

**Update in Contact page:**

Open `contact.html` and find the contact information cards to update address, phone, email, and hours.

### 4. Setting Up FormSubmit.co

**Step 1: Choose Your Email**

FormSubmit.co is a free form backend service. Forms will be sent to your email.

**Step 2: Update Form Action**

In `index.html` and `contact.html`, find all forms and update:

```html
<form action="https://formsubmit.co/YOUR_EMAIL@example.com" method="POST" data-validate="true">
```

Replace `YOUR_EMAIL@example.com` with your actual email address.

**Step 3: Verify Email (First Time Only)**

1. Submit a test form
2. FormSubmit will send you a verification email
3. Click the verification link
4. Your form is now active!

**Step 4: Optional Settings**

Update the success redirect URL:
```html
<input type="hidden" name="_next" value="https://yourwebsite.com/index.html?success=true">
```

### 5. Updating Google Maps

In `contact.html`, find the map iframe and replace with your location:

1. Go to [Google Maps](https://maps.google.com)
2. Search for your address
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe in `contact.html`

### 6. Adding Your Images

**Replace demo images with your own:**

- **Hero images:** Place in `images/hero/`
- **Gallery images:** Place in `images/gallery/`
- **Faculty photos:** Place in `images/faculty/`
- **Results:** Place in `images/results/`
- **Testimonials:** Place in `images/testimonials/`

**Update image references in HTML:**
```html
<!-- Before -->
<img src="images/gallery/classroom-1.png" alt="Classroom">

<!-- After -->
<img src="images/gallery/your-classroom-photo.jpg" alt="Our Classroom">
```

### 7. Updating Content

All customizable content is marked with `<!-- [CUSTOMIZE] -->` comments in the HTML files.

**Example - Homepage statistics:**
```html
<!-- [CUSTOMIZE] Update statistics -->
<div class="stat-number" data-counter="1500">0</div>
<div class="stat-label">Students Enrolled</div>
```

**Example - Course details:**
```html
<!-- [CUSTOMIZE] Course information -->
<h3>Course Duration & Structure</h3>
<div class="feature-list">
    <div class="feature-item"><span>Your program details here</span></div>
</div>
```

### 8. Updating Meta Tags for SEO

In each HTML file, update the meta tags:
```html
<title>Your Institute Name - JEE & NEET Coaching</title>
<meta name="description" content="Your custom description here">
<meta name="keywords" content="your, keywords, here">
```

## 📧 FormSubmit.co Setup (Detailed)

### Basic Setup

1. **Replace email in forms:**
   ```html
   <form action="https://formsubmit.co/your-email@domain.com" method="POST">
   ```

2. **Verify your email** (one-time):
   - Submit a test form after replacing the email
   - Check your inbox for verification email
   - Click the verification link

### Advanced Features

FormSubmit supports many features via hidden fields:

```html
<!-- Custom email subject -->
<input type="hidden" name="_subject" value="New enquiry from website">

<!-- Remove captcha (or set to "true" for protection) -->
<input type="hidden" name="_captcha" value="false">

<!-- Custom success page redirect -->
<input type="hidden" name="_next" value="https://yoursite.com/thank-you.html">

<!-- Table format for better email readability -->
<input type="hidden" name="_template" value="table">

<!-- Send copy to submitter -->
<input type="hidden" name="_cc" value="another-email@domain.com">
```

### Form Validation

The template includes client-side validation for:
- Required fields
- Email format
- Phone number (10 digits)
- Real-time error messages

## 🛠️ Technology Stack

- **HTML5** - Semantic markup for better SEO
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Inter and Poppins fonts
- **FormSubmit.co** - Form backend (no server required)
- **Google Maps** - Location embed

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- **Optimized images** - Compressed for fast loading
- **Minimal dependencies** - No heavy frameworks
- **CSS variables** - Efficient styling
- **Lazy loading** - Gallery images load on demand
- **Mobile-first** - Fast on all devices

Expected performance:
- **Page Load Time:** < 3 seconds
- **Lighthouse Score:** 90+
- **Mobile-Friendly:** ✅ Yes

## 📁 File Structure

```
coaching-website/
├── index.html              # Homepage
├── about.html              # About Us page
├── courses.html            # Courses page
├── gallery.html            # Photo Gallery
├── contact.html            # Contact page
├── results.html            # Results & Testimonials
├── css/
│   ├── style.css          # Main stylesheet
│   ├── responsive.css     # Responsive breakpoints
│   └── lightbox.css       # Gallery lightbox styles
├── js/
│   ├── main.js            # Main functionality
│   ├── gallery.js         # Gallery & lightbox
│   └── form-handler.js    # Form validation
├── images/
│   ├── hero/              # Hero section images
│   ├── gallery/           # Gallery photos
│   ├── faculty/           # Faculty portraits
│   ├── results/           # Result cards
│   ├── icons/             # Icons and graphics
│   └── testimonials/      # Student photos
├── assets/
│   └── logo.png           # Institute logo
└── README.md              # This file
```

## 🔧 Common Customizations

### Change Navigation Menu Items

Edit the navbar in all HTML files:
```html
<ul class="navbar-menu">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About Us</a></li>
    <!-- Add or remove menu items here -->
</ul>
```

### Add Social Media Links

Update footer social links in all pages:
```html
<div class="social-links">
    <a href="https://facebook.com/yourpage" aria-label="Facebook">📘</a>
    <a href="https://instagram.com/yourpage" aria-label="Instagram">📷</a>
    <a href="https://youtube.com/yourchannel" aria-label="YouTube">📺</a>
    <a href="https://twitter.com/yourhandle" aria-label="Twitter">🐦</a>
</div>
```

### Modify Courses Offered

Edit the courses section in `index.html` and `courses.html`:
```html
<div class="card course-card">
    <div class="card-content">
        <div class="course-icon">⚛️</div>
        <h3 class="card-title">Your Course Name</h3>
        <p class="card-text">Course description...</p>
        <!-- Add features -->
    </div>
</div>
```

## 📝 Deployment

### Option 1: Deploy to GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repo-name/`

### Option 2: Deploy to Netlify (Free)

1. Sign up at [Netlify](https://netlify.com)
2. Drag and drop the `coaching-website` folder
3. Your site will be live with a custom domain option

### Option 3: Traditional Web Hosting

1. Upload all files to your web hosting via FTP
2. Ensure `index.html` is in the root directory
3. Website is live at your domain

## ❓ Support & Troubleshooting

### Forms not working?
- Ensure you've replaced `YOUR_EMAIL@example.com` with your actual email
- Check spam folder for verification email from FormSubmit
- Verify email format is correct

### Images not showing?
- Check file paths are correct
- Ensure images are in the correct folders
- Verify image file extensions match (e.g., .png, .jpg)

### Styling looks broken?
- Clear browser cache
- Ensure all CSS files are linked correctly
- Check console for errors

## 📄 License

This template is free to use for educational coaching institutes. You may modify and customize it according to your needs.

## 🙏 Credits

- **Fonts:** Google Fonts (Inter, Poppins)
- **Form Backend:** FormSubmit.co
- **Maps:** Google Maps
- **Icons:** Unicode Emojis (universal support)

---

**Ready to customize?** Start by updating the contact information, colors, and adding your own images. Good luck! 🚀
