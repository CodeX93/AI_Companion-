'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { companionPresets, personalityTraits, hairColors, eyeColors, styles } from '@/lib/presets';

export default function CompanionCreator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customizing, setCustomizing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    personality: {
      traits: [] as string[],
      description: '',
    },
    appearance: {
      hairColor: '',
      eyeColor: '',
      style: '',
      description: '',
    },
  });

  const presets = companionPresets[gender];

  const handlePresetSelect = (index: number) => {
    setSelectedPreset(index);
    const preset = presets[index];
    setFormData({
      name: preset.name,
      age: preset.age,
      personality: preset.personality,
      appearance: preset.appearance,
    });
  };

  const handleTraitToggle = (trait: string) => {
    const traits = formData.personality.traits.includes(trait)
      ? formData.personality.traits.filter(t => t !== trait)
      : [...formData.personality.traits, trait];
    
    setFormData({
      ...formData,
      personality: { ...formData.personality, traits },
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/companions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, gender }),
      });

      if (!res.ok) throw new Error('Failed to create companion');

      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating companion:', error);
      alert('Failed to create companion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-2">Create Your Companion</h1>
          <p className="text-[var(--text-secondary)]">Design the perfect AI companion tailored to you</p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Choose Gender</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => setGender('female')}
                className={`glass-effect p-8 rounded-2xl transition-all transform hover:scale-105 ${
                  gender === 'female' ? 'border-[var(--accent)] bg-[var(--accent)]/10' : ''
                }`}
              >
                <div className="text-6xl mb-4">👩</div>
                <h3 className="text-2xl font-semibold">Girlfriend</h3>
              </button>

              <button
                onClick={() => setGender('male')}
                className={`glass-effect p-8 rounded-2xl transition-all transform hover:scale-105 ${
                  gender === 'male' ? 'border-[var(--accent)] bg-[var(--accent)]/10' : ''
                }`}
              >
                <div className="text-6xl mb-4">👨</div>
                <h3 className="text-2xl font-semibold">Boyfriend</h3>
              </button>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold rounded-full transition-all transform hover:scale-105 shimmer"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && !customizing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Choose a Preset</h2>
              <p className="text-[var(--text-secondary)]">Select a starting point, then customize</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {presets.map((preset, index) => (
                <div
                  key={index}
                  onClick={() => handlePresetSelect(index)}
                  className={`glass-effect p-6 rounded-2xl cursor-pointer transition-all transform hover:scale-105 ${
                    selectedPreset === index ? 'border-[var(--accent)] bg-[var(--accent)]/10' : ''
                  }`}
                >
                  <div className="text-4xl mb-3">{gender === 'female' ? '👩' : '👨'}</div>
                  <h3 className="text-xl font-semibold mb-1">{preset.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">{preset.age} years old</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-[var(--text-secondary)]">{preset.personality.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {preset.personality.traits.slice(0, 3).map(trait => (
                        <span key={trait} className="text-xs px-2 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 glass-effect hover:bg-[#2a2a2a] rounded-full transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setCustomizing(true)}
                disabled={selectedPreset === null}
                className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shimmer"
              >
                Customize
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && customizing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Customize Your Companion</h2>
            </div>

            <div className="glass-effect rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  min="18"
                  max="50"
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Personality Traits (select up to 5)</label>
                <div className="flex flex-wrap gap-2">
                  {personalityTraits.map(trait => (
                    <button
                      key={trait}
                      type="button"
                      onClick={() => handleTraitToggle(trait)}
                      disabled={!formData.personality.traits.includes(trait) && formData.personality.traits.length >= 5}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.personality.traits.includes(trait)
                          ? 'bg-[var(--accent)] text-black'
                          : 'glass-effect hover:bg-[#2a2a2a]'
                      } disabled:opacity-30 disabled:cursor-not-allowed`}
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Personality Description</label>
                <textarea
                  value={formData.personality.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    personality: { ...formData.personality, description: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  placeholder="Describe their personality..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Hair Color</label>
                  <select
                    value={formData.appearance.hairColor}
                    onChange={(e) => setFormData({
                      ...formData,
                      appearance: { ...formData.appearance, hairColor: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-colors"
                  >
                    <option value="">Select</option>
                    {hairColors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Eye Color</label>
                  <select
                    value={formData.appearance.eyeColor}
                    onChange={(e) => setFormData({
                      ...formData,
                      appearance: { ...formData.appearance, eyeColor: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-colors"
                  >
                    <option value="">Select</option>
                    {eyeColors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Style</label>
                  <select
                    value={formData.appearance.style}
                    onChange={(e) => setFormData({
                      ...formData,
                      appearance: { ...formData.appearance, style: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-colors"
                  >
                    <option value="">Select</option>
                    {styles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Appearance Description</label>
                <textarea
                  value={formData.appearance.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    appearance: { ...formData.appearance, description: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  placeholder="Describe their appearance..."
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCustomizing(false)}
                className="px-6 py-2 glass-effect hover:bg-[#2a2a2a] rounded-full transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.name || formData.personality.traits.length === 0}
                className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shimmer"
              >
                {loading ? 'Creating...' : 'Create Companion'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
