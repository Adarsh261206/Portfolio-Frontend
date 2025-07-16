# Portfolio Frontend

This is the frontend for your portfolio website.

## How to Deploy on Netlify

1. **Push these files (`index.html`, `style.css`, `script.js`) to a new GitHub repository.**
2. **Go to [Netlify](https://app.netlify.com/)** and create a new site from Git.
3. **Connect your GitHub repo.**
4. **Set build settings:**
   - **Build command:** (leave blank)
   - **Publish directory:** `/` (root)
5. **Deploy!**

## IMPORTANT: Update Backend URL

After deploying your backend (e.g., on Render), update the `fetch` URL in `script.js`:

```
fetch('https://your-backend.onrender.com/contact', { ... })
```

Replace with your actual backend URL. 