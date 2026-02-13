# Quick Start Guide

## Installation & Running

1. **Extract the project**
   ```bash
   unzip ai-companion-app.zip
   cd ai-companion-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to: http://localhost:3000

## First Time Setup

1. **Create an account**
   - Click "Get Started" on the homepage
   - Fill in your name, email, and password
   - Click "Create Account"

2. **Sign in**
   - Use your email and password to log in
   - You'll be redirected to your dashboard

3. **Create your first companion**
   - Click "Create Companion" button
   - Choose gender (Girlfriend or Boyfriend)
   - Select a preset or customize from scratch
   - Customize personality traits, appearance, and details
   - Click "Create Companion"

4. **Start chatting**
   - Click "Chat" on any companion card
   - Send your first message!
   - The AI will respond in character

## Features Overview

### Dashboard
- View all your companions
- Create new companions
- Delete existing companions
- Quick access to chat

### Companion Creation
- **Gender Selection**: Choose between girlfriend or boyfriend
- **Presets**: Start with pre-configured personalities
- **Customization**:
  - Name and age
  - Personality traits (choose up to 5)
  - Hair color, eye color, style
  - Custom descriptions
  
### Chat Interface
- Real-time conversations with your AI companion
- Message history is saved
- Natural, personality-driven responses
- Responsive design for any device

## Project Structure

```
ai-companion-app/
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript types
├── public/               # Static assets
├── package.json          # Dependencies
└── README.md            # Full documentation
```

## Customization Tips

### Change the Color Scheme
Edit `src/app/globals.css`:
```css
:root {
  --accent: #d4af37;        /* Change to your preferred color */
  --accent-hover: #c29d2f;  /* Hover state color */
}
```

### Add More Personality Traits
Edit `src/lib/presets.ts`:
```typescript
export const personalityTraits = [
  'YourNewTrait',
  // ... existing traits
];
```

### Modify AI Behavior
The system prompt is generated in `src/app/api/companions/route.ts`.
You can adjust how the AI responds by modifying the prompt structure.

## Common Issues

### Port 3000 already in use
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### API not working
- Make sure `.env.local` exists with NEXTAUTH_SECRET
- Check that you're logged in (session required for API calls)
- Open browser console to see detailed error messages

### Styling issues
```bash
# Rebuild Tailwind CSS
npm run build
npm run dev
```

## Development Mode Features

- Hot reload - changes appear instantly
- Error overlay - see errors in the browser
- Fast refresh - preserves component state

## Next Steps

1. Read the full `README.md` for detailed documentation
2. Explore the code in `src/` directory
3. Customize the design to match your preferences
4. Deploy to Vercel or your preferred platform

## Need Help?

- Check `README.md` for comprehensive documentation
- Review code comments in the source files
- Look at the API route implementations in `src/app/api/`

Enjoy building with your AI Companion App! 🎉
