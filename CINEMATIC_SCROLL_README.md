# Cinematic Scroll Experience

A smooth, cinematic scroll experience using GSAP and ScrollTrigger, inspired by the GreenSock demo. This system creates seamless crossfade + depth-push transitions between sections with dynamic background video filtering.

## 🎬 Features

- **Fixed Background Video**: Continuous video with dynamic filter effects
- **Crossfade + Depth Push**: Sections fade and move in 3D space as you scroll
- **Particle Overlay**: Subtle fog/particle effects using HTML5 Canvas
- **CSS Variables**: Easy customization of filter intensities and timing
- **Mobile Optimized**: Reduced effects and responsive design
- **Performance Optimized**: Uses `scrub: true` and lightweight animations
- **Accessibility**: Respects `prefers-reduced-motion` settings

## 🚀 Quick Start

### 1. Access the Cinematic Experience
Visit `/cinematic` in your browser to see the cinematic scroll experience in action.

### 2. Video Setup
Replace the video source in `CinematicScroll.tsx`:
```tsx
<source src="YOUR_VIDEO_PATH.mp4" type="video/mp4" />
```

### 3. Customize Sections
Edit the sections in `CinematicScroll.tsx` to match your content:
```tsx
<section className="cinematic-section" id="your-section">
  <div className="cinematic-content">
    <h2 className="cinematic-title">Your Title</h2>
    <p className="cinematic-description">Your content here</p>
  </div>
</section>
```

## 🎨 Customization

### CSS Variables
Control the visual effects using CSS variables in `cinematic-scroll.css`:

```css
:root {
  --hue-shift: 0deg;           /* Hue rotation per section */
  --brightness: 1;             /* Base brightness */
  --contrast: 1;               /* Base contrast */
  --saturation: 1;             /* Base saturation */
  --particle-opacity: 0.3;     /* Particle overlay opacity */
  --transition-duration: 1.2s; /* Animation duration */
  --ease-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Filter Effects
The background video automatically applies these effects per section:
- **Hue Rotation**: `i * 40deg` (40° per section)
- **Brightness**: `1 - i * 0.05` (slightly dimmer each section)
- **Contrast**: `1 + i * 0.1` (slightly more contrast each section)

### Adding New Sections
1. Add a new section in `CinematicScroll.tsx`:
```tsx
<section className="cinematic-section" id="new-section">
  <div className="cinematic-content">
    <h2 className="cinematic-title">New Section</h2>
    <p className="cinematic-description">Your content</p>
  </div>
</section>
```

2. The GSAP ScrollTrigger will automatically detect and animate the new section.

## 🔧 Technical Details

### GSAP ScrollTrigger Setup
```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: next,
    start: "top bottom",
    end: "top center",
    scrub: true,
  },
});

// Outgoing section animation
tl.to(section, {
  opacity: 0,
  z: -150,
  scale: 0.95,
  duration: 1.2,
  ease: "power3.inOut",
}, 0);

// Incoming section animation
tl.from(next, {
  opacity: 0,
  z: 150,
  scale: 1.05,
  duration: 1.2,
  ease: "power3.inOut",
}, 0);
```

### Particle System
The particle overlay uses HTML5 Canvas with:
- Random particle generation
- Soft movement and fade effects
- `mix-blend-mode: soft-light` for natural blending
- Performance-optimized with `requestAnimationFrame`

### 3D Perspective
- `perspective: 1200px` on the sections container
- `transform-style: preserve-3d` for proper 3D rendering
- `backface-visibility: hidden` for performance

## 📱 Mobile Optimization

The system automatically detects mobile devices and:
- Reduces video brightness shifts
- Simplifies particle effects
- Adjusts font sizes and spacing
- Maintains performance with `contain` CSS properties

## ♿ Accessibility

- Respects `prefers-reduced-motion` settings
- High contrast mode support
- Semantic HTML structure
- Keyboard navigation friendly

## 🎯 Performance Tips

1. **Video Optimization**: Use compressed MP4 videos (H.264)
2. **Canvas Performance**: Particle count is automatically limited
3. **GSAP Optimization**: Uses `will-change` and `contain` properties
4. **Mobile**: Reduced effects automatically applied

## 🔄 Integration with Existing Site

To integrate with your existing Global Trust Challenge sections:

1. **Replace Content**: Update the section content in `CinematicScroll.tsx`
2. **Match Styling**: Adjust CSS to match your brand colors
3. **Add Navigation**: Include your existing navbar/footer
4. **Customize Filters**: Modify the filter effects to match your theme

## 📁 File Structure

```
src/
├── components/
│   └── CinematicScroll.tsx    # Main component
├── pages/
│   └── CinematicHome.tsx      # Page wrapper
├── styles/
│   └── cinematic-scroll.css   # All styles
└── App.tsx                    # Route configuration
```

## 🎨 Styling Classes

### Main Classes
- `.cinematic-scroll-container` - Main wrapper
- `.cinematic-bg-video` - Fixed background video
- `.cinematic-particle-overlay` - Canvas overlay
- `.cinematic-section` - Individual sections
- `.cinematic-content` - Section content wrapper

### Content Classes
- `.cinematic-title` - Main headings
- `.cinematic-subtitle` - Subheadings
- `.cinematic-description` - Body text
- `.cinematic-button` - CTA buttons
- `.cinematic-feature` - Feature cards
- `.cinematic-phase` - Timeline items
- `.cinematic-partner` - Partner logos

## 🚀 Future Enhancements

1. **Custom Easing**: Add more easing functions
2. **Video Transitions**: Crossfade between different videos
3. **Interactive Elements**: Hover effects and micro-interactions
4. **Sound Design**: Audio that responds to scroll
5. **Advanced Particles**: More complex particle systems
6. **Section Types**: Different animation types per section

## 🐛 Troubleshooting

### Common Issues

1. **Video Not Playing**: Check autoplay policies and video format
2. **Animations Not Smooth**: Ensure GSAP is properly loaded
3. **Mobile Performance**: Check if mobile optimizations are applied
4. **Canvas Not Showing**: Verify canvas dimensions and z-index

### Debug Mode
Add `debug: true` to ScrollTrigger for debugging:
```javascript
scrollTrigger: {
  trigger: next,
  start: "top bottom",
  end: "top center",
  scrub: true,
  debug: true, // Add this line
}
```

## 📄 License

This cinematic scroll system is part of the Global Trust Challenge project and follows the same licensing terms.

---

**Ready to create stunning scroll experiences?** 🎬✨

Visit `/cinematic` to see it in action, then customize it to match your vision!

