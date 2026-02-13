# AI Companion App

A full-stack Next.js 14 application for creating and chatting with personalized AI companions using Claude AI.

## Features

- 🔐 **User Authentication** - Secure signup/login with NextAuth.js
- 👥 **Companion Creation** - Choose between AI girlfriends or boyfriends
- ✨ **Full Customization** - Personalize appearance, personality traits, and conversation style
- 💬 **Real-time Chat** - Natural conversations powered by Claude AI (Anthropic API)
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server-Side Rendering)
- **Language**: TypeScript
- **Authentication**: NextAuth.js with JWT
- **AI**: Anthropic Claude API
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Database**: In-memory storage (easily replaceable with PostgreSQL, MongoDB, etc.)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- An Anthropic API account (if deploying outside of Claude.ai artifacts)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-companion-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:
```env
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── companions/   # Companion CRUD operations
│   │   └── chat/         # Chat API with Claude
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── dashboard/        # User dashboard
│   └── companion/        # Companion routes
│       ├── create/       # Companion creation
│       └── [id]/         # Chat interface
├── components/           # React components
│   ├── DashboardClient.tsx
│   ├── CompanionCreator.tsx
│   └── ChatInterface.tsx
├── lib/                  # Utilities
│   ├── db.ts            # Database operations
│   ├── auth.ts          # NextAuth configuration
│   └── presets.ts       # Companion presets
└── types/               # TypeScript types
```

## Key Features Explained

### Authentication
- Secure password hashing with bcrypt
- JWT-based sessions with NextAuth.js
- Protected routes with server-side session checks

### Companion System
- Pre-built personality presets for quick start
- Full customization of:
  - Name and age
  - Personality traits (up to 5)
  - Physical appearance (hair, eyes, style)
  - Custom descriptions
- Gender selection (girlfriend/boyfriend)

### AI Chat
- Integration with Claude Sonnet 4 via Anthropic API
- Context-aware conversations (maintains last 20 messages)
- Custom system prompts based on companion configuration
- Real-time message streaming

### Database
Currently uses in-memory storage for simplicity. To use a real database:

1. Install your database client (e.g., `prisma` for PostgreSQL)
2. Update `src/lib/db.ts` with your database logic
3. Keep the same interface for minimal code changes

Example with Prisma:
```typescript
// Replace the Map-based storage with:
const user = await prisma.user.findUnique({ where: { email } });
```

## Customization

### Styling
- Edit `src/app/globals.css` for global styles
- Modify CSS variables in `:root` for color scheme
- Update `tailwind.config.js` for theme customization

### Companion Presets
- Add/modify presets in `src/lib/presets.ts`
- Customize personality traits, appearance options
- Create new companion templates

### AI Behavior
- Adjust system prompts in `src/app/api/companions/route.ts`
- Modify conversation context window size in `src/app/api/chat/route.ts`
- Tune Claude model parameters (temperature, max_tokens)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Works with any platform supporting Next.js 14:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Environment Variables

```env
# Required
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=your-deployment-url

# Optional (if not using Claude.ai artifacts)
ANTHROPIC_API_KEY=your-api-key
```

## API Routes

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `GET /api/companions` - Get user's companions
- `POST /api/companions` - Create new companion
- `DELETE /api/companions?id=...` - Delete companion
- `POST /api/chat` - Send message and get AI response
- `GET /api/chat?companionId=...` - Get chat history

## Security Considerations

- Passwords are hashed with bcrypt before storage
- JWT tokens are signed and verified
- All API routes check user authentication
- Users can only access their own companions and chats
- CSRF protection via NextAuth.js

## Future Enhancements

- [ ] Voice chat support
- [ ] Image generation for companions
- [ ] Message reactions and favorites
- [ ] Multiple companion conversations
- [ ] Export chat history
- [ ] Companion memory and context learning
- [ ] Social features (share companions, public gallery)
- [ ] Mobile apps (React Native)
- [ ] Advanced AI fine-tuning options

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Open a GitHub issue
- Check the documentation
- Review the code comments

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- Design inspired by modern dating and social apps
