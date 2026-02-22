# Tucker Dane Howard — Portfolio Site

Personal portfolio website for Tucker Dane Howard.  
Built with HTML, CSS, and vanilla JavaScript. Hosted on Vercel.

## Structure

```
tuckerdhoward/
├── index.html              ← Homepage
├── about.html              ← About page
├── contact.html            ← Contact page
├── music.html              ← Young Tuck / music page
├── css/
│   ├── style.css           ← Global styles
│   ├── about.css           ← About page styles
│   └── casestudy.css       ← Case study template styles
├── js/
│   └── main.js             ← All interactions (cursor, menu, scroll)
├── images/                 ← PUT YOUR PHOTOS HERE
│   ├── hero-bg.jpg
│   ├── visual-reverb-hero.jpg
│   ├── vr-painting-wall.jpg
│   ├── vr-detail-1.jpg
│   ├── vr-detail-2.jpg
│   ├── vr-gallery-install.jpg
│   ├── tucker-portrait.jpg
│   ├── nvidia-thumb.jpg
│   ├── apple-thumb.jpg
│   └── youngtuck-thumb.jpg
└── work/
    ├── visual-reverb.html  ← Visual Reverb case study
    ├── nvidia.html         ← NVIDIA concept case study
    ├── apple.html          ← Apple concept case study
    └── meta-ai.html        ← Meta AI work page
```

## Adding Images

1. Export/save your photos as JPG (for photos) or PNG (for graphics)
2. Rename them to match the filenames in `images/` above
3. Drag them into the `images/` folder
4. Commit and push — images will appear on the live site

## Deploying Updates

1. Make changes to files
2. Open GitHub Desktop
3. Write a commit message (e.g. "added Visual Reverb photos")
4. Click **Commit to main**
5. Click **Push origin**
6. Vercel auto-deploys in ~30 seconds

## Adding Video

For video files, upload to [Cloudinary](https://cloudinary.com) (free account):
1. Upload your MP4 there
2. Copy the URL it gives you
3. In `work/visual-reverb.html`, find the `<video>` tag and replace `YOUR_CLOUDINARY_VIDEO_URL.mp4`

## Contact

tuckerdhoward@gmail.com
