<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-white font-sans transition-colors duration-500">
    <!-- NAVIGATION -->
    <nav
      class="fixed top-0 inset-x-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="relative w-10 h-10">
            <img src="/mindqlab-logo.png" alt="MindQLab Logo"
              class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span
            class="font-bold text-zinc-900 dark:text-white text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">MindQLab</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink to="#method"
            class="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Method
          </NuxtLink>
          <NuxtLink to="#system-layers"
            class="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            System
          </NuxtLink>
          <NuxtLink to="#pricing"
            class="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Pricing
          </NuxtLink>

          <div class="flex items-center gap-4">
            <button @click="toggleTheme"
              class="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:scale-110 transition-transform">
              <span v-if="themeStore.theme === 'dark'" class="text-sm">☀️</span>
              <span v-else class="text-sm">🌙</span>
            </button>
            <button @click="handleAuth"
              class="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
              Login
            </button>
          </div>
        </div>

        <!-- Mobile Controls -->
        <div class="flex md:hidden items-center gap-3">
          <button @click="toggleTheme"
            class="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
            <span v-if="themeStore.theme === 'dark'" class="text-sm">☀️</span>
            <span v-else class="text-sm">🌙</span>
          </button>
          <button @click="handleAuth"
            class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-semibold">
            Login
          </button>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <header
      class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden min-h-[85vh] flex items-center justify-center">
      <!-- Background Visualization -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <ClientOnly>
          <CursorNeuralVisualizer />
        </ClientOnly>
      </div>

      <div class="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 dark:border-cyan-500/30 mb-6">
          <div class="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div>
          <span class="text-sm font-medium text-cyan-600 dark:text-cyan-400">PERSONAL DEVELOPMENT SYSTEM</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
          Tools for Conscious<br class="hidden md:block" /> Mental Maturity
        </h1>
        <p class="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 mb-10 max-w-2xl mx-auto">
          A systematic approach to growth through diagnostics, analysis, and targeted practices.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink to="/space/tests"
            class="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
            <span class="flex items-center justify-center space-x-2">
              <span>Start with Primary Diagnostics</span>
              <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </span>
          </NuxtLink>
          <NuxtLink to="#method"
            class="px-8 py-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Learn About the Method
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- VALUE PROPOSITION -->
    <section class="py-20 bg-white dark:bg-black">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">What will you get immediately?
          </h2>
          <p class="text-lg text-zinc-600 dark:text-zinc-400">The result of the first step is clarity and an action
            plan.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Item 1 -->
          <div
            class="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 transform hover:-translate-y-2">
            <div
              class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-fingerprint text-2xl text-cyan-600 dark:text-cyan-400"></i>
            </div>
            <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-4">State Profile</h3>
            <p class="text-zinc-600 dark:text-zinc-400">
              A map of your cognitive and emotional patterns, not just a set of scores.
            </p>
          </div>

          <!-- Item 2 -->
          <div
            class="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 transform hover:-translate-y-2">
            <div
              class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-align-left text-2xl text-cyan-600 dark:text-cyan-400"></i>
            </div>
            <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-4">Core Interpretations</h3>
            <p class="text-zinc-600 dark:text-zinc-400">
              Clear explanation: why you feel tired, lose focus, or feel anxious.
            </p>
          </div>

          <!-- Item 3 -->
          <div
            class="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 transform hover:-translate-y-2">
            <div
              class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-route text-2xl text-cyan-600 dark:text-cyan-400"></i>
            </div>
            <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-4">First Recommendations</h3>
            <p class="text-zinc-600 dark:text-zinc-400">
              Priority development areas and specific practices to get started.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- METHOD (5-Step Cycle) -->
    <section id="method" class="py-20 bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">MindQLab Method: Growth Cycle
          </h2>
          <p class="text-lg text-zinc-600 dark:text-zinc-400">Five stages of conscious growth</p>
        </div>

        <div class="relative">
          <!-- Connector Line (Desktop) -->
          <div
            class="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-cyan-500/30 z-0">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
            <!-- Step 1 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-cyan-500/50 dark:border-cyan-500/30 flex items-center justify-center mb-4 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                01
              </div>
              <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Diagnostics</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">Data collection on cognitive and behavioral patterns.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-cyan-500/50 dark:border-cyan-500/30 flex items-center justify-center mb-4 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                02
              </div>
              <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Understanding</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">Interpretation of results into a clear personality
                model.</p>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-cyan-500/50 dark:border-cyan-500/30 flex items-center justify-center mb-4 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                03
              </div>
              <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Directions</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">Choosing development vectors based on strengths and
                weaknesses.</p>
            </div>

            <!-- Step 4 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-cyan-500/50 dark:border-cyan-500/30 flex items-center justify-center mb-4 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                04
              </div>
              <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Practice</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">Targeted drills and exercises to build skills.</p>
            </div>

            <!-- Step 5 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-cyan-500/50 dark:border-cyan-500/30 flex items-center justify-center mb-4 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                05
              </div>
              <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Refinement</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">Progress analysis and re-evaluation to adjust the
                path.</p>
            </div>
          </div>
        </div>

        <!-- Micro Example -->
        <div
          class="mt-16 mx-auto max-w-3xl p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-600/5 border border-cyan-500/20 dark:border-cyan-500/30">
          <div class="flex items-center mb-6">
            <div class="w-3 h-3 rounded-full bg-cyan-500 mr-3 animate-pulse"></div>
            <span class="text-sm font-medium text-cyan-600 dark:text-cyan-400">Live example of the cycle</span>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Step 1</div>
              <div class="text-zinc-900 dark:text-white font-medium">System detects attention fatigue</div>
            </div>
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Step 2</div>
              <div class="text-zinc-900 dark:text-white font-medium">Recommended "Cognitive Endurance" track</div>
            </div>
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Step 3</div>
              <div class="text-zinc-900 dark:text-white font-medium">After 2 weeks re-test showed +15% focus</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TOOLS LAYERS -->
    <section id="system-layers" class="py-20 bg-white dark:bg-black">
      <div class="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div class="text-center mb-16">
          <p class="text-lg text-zinc-600 dark:text-zinc-400 mb-2">How the method is implemented within the product.</p>
          <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">System Architecture</h2>
        </div>

        <div class="space-y-4">
          <!-- Layer 1 -->
          <div
            class="group p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mr-4">
                <i class="fas fa-stethoscope text-zinc-600 dark:text-zinc-400"></i>
              </div>
              <div class="flex-grow">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-1">Diagnostic Module</h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Identifies real behavioral patterns hidden from
                  ordinary observation.</p>
              </div>
              <div
                class="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 md:ml-6 mt-4 md:mt-0">
                Stage 1</div>
            </div>
          </div>

          <!-- Layer 2 -->
          <div
            class="group p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mr-4">
                <i class="fas fa-fingerprint text-zinc-600 dark:text-zinc-400"></i>
              </div>
              <div class="flex-grow">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-1">Analytical Core</h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Turns raw data into a clear map of your personality
                  and explains reaction causes.</p>
              </div>
              <div
                class="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 md:ml-6 mt-4 md:mt-0">
                Stage 2</div>
            </div>
          </div>

          <!-- Layer 3 -->
          <div
            class="group p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mr-4">
                <i class="fas fa-compass text-zinc-600 dark:text-zinc-400"></i>
              </div>
              <div class="flex-grow">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-1">Recommendation System</h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Filters out noise and suggests only the development
                  vectors relevant to you now.</p>
              </div>
              <div
                class="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 md:ml-6 mt-4 md:mt-0">
                Stage 3</div>
            </div>
          </div>

          <!-- Layer 4 -->
          <div
            class="group p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mr-4">
                <i class="fas fa-dumbbell text-zinc-600 dark:text-zinc-400"></i>
              </div>
              <div class="flex-grow">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-1">Skills Laboratory</h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Trains specific cognitive muscles (memory,
                  attention, control) through regular practice.</p>
              </div>
              <div
                class="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 md:ml-6 mt-4 md:mt-0">
                Stage 4</div>
            </div>
          </div>

          <!-- Layer 5 -->
          <div
            class="group p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mr-4">
                <i class="fas fa-history text-zinc-600 dark:text-zinc-400"></i>
              </div>
              <div class="flex-grow">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-1">Progress Monitoring</h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Tracks real changes through re-tests,
                  micro-behavioral markers, and profile dynamics.</p>
              </div>
              <div
                class="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 md:ml-6 mt-4 md:mt-0">
                Stage 5</div>
            </div>
          </div>

          <!-- Layer: Experimental (Voice to Structure) -->
          <div
            class="group p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 dark:border-cyan-500/20 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mr-4">
                <i class="fas fa-microphone-alt text-cyan-600 dark:text-cyan-400"></i>
              </div>
              <div class="flex-grow">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-1">Voice-to-Structure (Beta)</h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Experimental AI tool to turn chaotic thoughts into
                  clear cognitive structures.</p>
              </div>
              <NuxtLink to="/space/experiments/voice-structure"
                class="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 hover:underline md:ml-6 mt-4 md:mt-0 whitespace-nowrap">
                TRY IT &rarr;
              </NuxtLink>
            </div>
          </div>

          <!-- Layer 6 (Professional) -->
          <div
            class="group p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-purple-600/5 border-2 border-cyan-500/50 dark:border-cyan-500/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mr-4">
                <i class="fas fa-user-tie text-zinc-600 dark:text-zinc-400"></i>
              </div>
              <div class="flex-grow">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-1">Dashboard for Specialists</h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Allows coaches and psychologists to manage clients,
                  view their progress, and results in real-time.</p>
              </div>
              <div
                class="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 md:ml-6 mt-4 md:mt-0">
                Professional</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COACH & PROFESSIONAL TOOLS -->
    <section
      class="py-20 bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="flex-1 space-y-8">
            <div
              class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 dark:border-cyan-500/30">
              <span class="text-sm font-medium text-cyan-600 dark:text-cyan-400">For Specialists</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              Tools for Effective <span class="text-cyan-600 dark:text-cyan-400">Support</span>
            </h2>
            <p class="text-lg text-zinc-600 dark:text-zinc-400">
              We have developed special functionality for coaches, trainers, and psychologists. Now you can not only
              recommend exercises but also track your clients' dynamics in a single dashboard.
            </p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="mt-1 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-check text-xs text-cyan-600 dark:text-cyan-400"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-lg text-zinc-900 dark:text-white mb-2">Client Management</h4>
                  <p class="text-zinc-600 dark:text-zinc-400">Invite clients via personal links and manage your database
                    in a convenient interface.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="mt-1 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-check text-xs text-cyan-600 dark:text-cyan-400"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-lg text-zinc-900 dark:text-white mb-2">Transparent Analytics</h4>
                  <p class="text-zinc-600 dark:text-zinc-400">Progress visualization, test results, and engagement
                    levels for each client.</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex-1 w-full">
            <div
              class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-xl">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 mb-2">
                    Preview</div>
                  <h3 class="text-2xl font-bold text-zinc-900 dark:text-white">Coach Dashboard</h3>
                </div>
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center">
                  <i class="fas fa-users-cog text-xl text-cyan-600 dark:text-cyan-400"></i>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="i in 3" :key="i"
                  class="h-14 bg-zinc-50 dark:bg-zinc-800 flex items-center px-4 gap-4 rounded-xl">
                  <div class="w-10 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
                  <div class="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  <div class="ml-auto w-14 h-3 bg-cyan-500/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- APPROACH & CREDIBILITY -->
    <section class="py-20 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      <div class="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">Approach and
          Principles
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div
            class="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center mb-6">
              <i class="fas fa-flask text-xl text-cyan-600 dark:text-cyan-400"></i>
            </div>
            <h4 class="text-xl font-bold text-zinc-900 dark:text-white mb-4">Scientific Basis, Not Magic</h4>
            <p class="text-zinc-600 dark:text-zinc-400">
              We rely on cognitive models and behavioral psychology. Our method is structured work with attention and
              habits, not a search for a magic pill.
            </p>
          </div>
          <div
            class="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center mb-6">
              <i class="fas fa-tools text-xl text-cyan-600 dark:text-cyan-400"></i>
            </div>
            <h4 class="text-xl font-bold text-zinc-900 dark:text-white mb-4">A Tool, Not a Substitute</h4>
            <p class="text-zinc-600 dark:text-zinc-400">
              The platform does not replace therapy. We focus on developing self-regulation and thinking skills that
              help in everyday life.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="py-20 bg-white dark:bg-black">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Choose Your Participation Format
          </h2>
          <p class="text-lg text-zinc-600 dark:text-zinc-400">Transparent conditions for access to the development
            system.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Free -->
          <div
            class="relative p-8 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 transform hover:-translate-y-2">
            <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Start</h3>
            <div class="text-4xl font-bold text-zinc-900 dark:text-white mb-6">Free</div>
            <ul class="text-zinc-600 dark:text-zinc-400 space-y-4 mb-8">
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-cyan-500 dark:text-cyan-400 mt-1"></i>
                <span>Primary diagnostics</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-cyan-500 dark:text-cyan-400 mt-1"></i>
                <span>Basic practices</span>
              </li>
            </ul>
            <NuxtLink to="/register"
              class="w-full py-4 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 text-center rounded-xl font-semibold hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all">
              Complete Start Profile
            </NuxtLink>
          </div>

          <!-- Popular -->
          <div
            class="relative p-8 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white transform md:scale-105 shadow-2xl">
            <div
              class="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-yellow-400 text-black rounded-full text-sm font-bold shadow-lg">
              POPULAR CHOICE
            </div>
            <h3 class="text-2xl font-bold mb-2">Practitioner</h3>
            <div class="text-4xl font-bold mb-6">$5 <span class="text-lg opacity-80">/mo</span></div>
            <ul class="space-y-4 mb-8 opacity-95">
              <li class="flex items-start gap-3">
                <i class="fas fa-check mt-1"></i>
                <span>Full access to Development Center</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check mt-1"></i>
                <span>Deep diagnostics</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check mt-1"></i>
                <span>Progress analytics</span>
              </li>
            </ul>
            <button
              class="w-full py-4 bg-white text-cyan-600 text-center rounded-xl font-semibold hover:bg-cyan-50 transition-colors shadow-lg">
              Select Plan
            </button>
          </div>

          <!-- Pro -->
          <div
            class="relative p-8 rounded-2xl border-2 border-purple-500/30 bg-white dark:bg-zinc-900 transition-all duration-300 transform hover:-translate-y-2">
            <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Lifetime</h3>
            <div class="text-4xl font-bold text-zinc-900 dark:text-white mb-6">$99</div>
            <ul class="text-zinc-600 dark:text-zinc-400 space-y-4 mb-8">
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-purple-500 mt-1"></i>
                <span>Lifetime access</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-purple-500 mt-1"></i>
                <span>Priority support</span>
              </li>
            </ul>
            <button
              class="w-full py-4 bg-purple-600 text-white text-center rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              Buy Access
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- KNOWLEDGE & BLOG -->
    <section class="py-20 bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">Knowledge Base</h2>
            <p class="text-lg text-zinc-600 dark:text-zinc-400">Materials for understanding the method</p>
          </div>
          <NuxtLink to="/blog"
            class="mt-4 md:mt-0 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
            All Articles →
          </NuxtLink>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <template v-if="latestPosts && latestPosts.length > 0">
            <article v-for="post in latestPosts.slice(0, 2)" :key="post._id"
              class="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-4">{{ post.title }}</h3>
              <p class="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3">{{ post.excerpt ||
                'Read article...' }}</p>
              <NuxtLink :to="`/blog/${post.slug.current}`"
                class="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
                Read Now →
              </NuxtLink>
            </article>
          </template>
          <div v-else
            class="col-span-2 text-center py-16 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <i class="fas fa-newspaper text-4xl text-zinc-300 dark:text-zinc-700 mb-4"></i>
            <p class="text-zinc-500 dark:text-zinc-400 text-lg">New articles coming soon</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-white dark:bg-black">
      <div class="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">Frequently Asked
          Questions</h2>
        <div class="space-y-4">
          <div v-for="(item, i) in faq" :key="i"
            class="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 transition-colors">
            <button @click="toggleFaq(i)"
              class="w-full p-6 text-left flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <span class="font-semibold text-lg text-zinc-900 dark:text-white">{{ item.q }}</span>
              <i :class="['fas fa-chevron-down transition-transform duration-300 text-zinc-400',
                openFaqs[i] ? 'rotate-180 text-cyan-500' : '']"></i>
            </button>
            <div v-if="openFaqs[i]" class="px-6 pb-6 pt-2">
              <p class="text-zinc-600 dark:text-zinc-400">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-20 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-cyan-500/10 border-t border-zinc-200 dark:border-zinc-800">
      <div class="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">Start Your Development Journey
        </h2>
        <p class="text-lg text-zinc-600 dark:text-zinc-400 mb-10">
          Join a community of people who are consciously working on their thinking and emotional intelligence.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <NuxtLink to="/space/tests"
            class="group px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]">
            <span class="flex items-center justify-center space-x-2">
              <span>Start for Free</span>
              <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </span>
          </NuxtLink>
          <NuxtLink to="/register"
            class="px-10 py-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Register
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme";
import CursorNeuralVisualizer from '~/components/space/CursorNeuralVisualizer.vue';
import Footer from "~/components/ui/Footer.vue";

definePageMeta({
  layout: "empty",
});

const authStore = useAuthStore();
const themeStore = useThemeStore();
const router = useRouter();
const openFaqs = ref({});

// Theme Logic
const isDark = computed(() => themeStore.theme === 'dark');
const toggleTheme = () => {
  themeStore.toggleTheme();
};

// FAQ Toggle
const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index];
};

// Auth Logic
const handleAuth = () => {
  if (authStore.user) {
    router.push('/space/dashboard');
  } else {
    router.push('/login');
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  themeStore.initTheme();
});

// FAQ Data
const faq = [
  { q: "How exactly does MindQLab work with me?", a: "We use a 5-stage cycle: state diagnostics, understanding formation, development track selection, skill practice, and progress analysis." },
  { q: "What happens after the tests?", a: "The system forms your profile and recommends specific exercises for areas requiring attention." },
  { q: "How is progress tracked?", a: "We track the dynamics of changes through repeated micro-measurements and the results of practice sessions." },
  { q: "Does this replace a psychologist?", a: "No, MindQLab is a tool for developing cognitive and emotional skills that can perfectly complement work with a specialist but does not replace it." },
  { q: "Can I try it for free?", a: "Yes, you can complete the primary diagnostics and receive a basic profile for free." }
];

// Blog Data 
const posts = ref([]);
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

const { data: fetchedPosts } = await useAsyncData("posts-landing", fetchPosts);
posts.value = Array.isArray(fetchedPosts.value) ? fetchedPosts.value : [];
const latestPosts = computed(() => posts.value.slice(0, 2));

useSeoMeta({
  title: 'MindQLab — Personal Development System',
  description: 'Platform for diagnostics, understanding, and thinking development. A structured approach to personal effectiveness.',
});
</script>

<style scoped>
/* Custom animations */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Selection colors */
::selection {
  background-color: rgba(6, 182, 212, 0.3);
  color: inherit;
}

.dark ::selection {
  background-color: rgba(6, 182, 212, 0.5);
}

/* Smooth transitions */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>