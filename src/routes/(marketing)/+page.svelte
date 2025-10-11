<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  }
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div class="hero min-h-[60vh]">
  <div class="hero-content text-center py-12">
    <div class="max-w-xl">
      <div
        class="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-3 md:mb-7 pb-1"
      >
        Чем мы занимаемся
      </div>

      <div
        class="text-4xl md:text-6xl font-bold px-2"
        style="line-height: 1.2;"
      >
        <span>Непредвзятое</span>
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >мышление</span
        >
        <!-- <span>reasoning</span> -->
      </div>
      <div class="mt-6 md:mt-10 text-sm md:text-lg">Передайте нам проблему</div>
      <div class="mt-6 md:mt-2">
        <!-- <a href="/contact_us">
          <button class="btn btn-primary btn-sm px-6">Email Now</button>
        </a> -->
        <button
          data-cal-link="enikeev/15min"
          data-cal-namespace="15min"
          class="btn btn-outline btn-primary btn-sm px-6 mt-3 mx-2"
          >Записаться на звонок<span class="text-sm opacity-70"
            >(бесплатно)</span
          >
        </button>
      </div>
    </div>
  </div>
</div>

<!-- 
<div class="min-h-[60vh]">
  <div class="pt-20 pb-8 px-7">
    <div class="max-w-lg mx-auto text-center">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent pb-2"
      >
        Our domain
      </div>
      <div class="mt-4 text-xl font-bold">
        Check out our
        <span
          class="underline decoration-secondary decoration-[3px] md:decoration-[4px]"
        >
          focus
        </span>
      </div>
    </div>

    <div
      class="flex gap-6 mt-12 max-w-[1064px] mx-auto place-content-center flex-wrap"
    >
      {#each features as feature}
        <div class="card bg-white w-[270px] min-h-[300px] flex-none shadow-xl">
          <div class="card-body items-center text-center p-[24px] pt-[32px]">
            <div>
              <svg
                width="50px"
                height="50px"
                class="mb-2 mt-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                eslint-disable-next-line svelte/no-at-html-tags
                {@html feature.svgContent}
              </svg>
            </div>
            <h2 class="card-title">
              {feature.name}
            </h2>
            <p class="text-sm">
              {feature.description}
            </p>
            {#if feature.link}
              <a
                href={feature.link}
                class="pb-4"
                target={feature.newPage ? "_blank" : ""}
              >
                <button
                  class="btn btn-xs btn-outline rounded-full btn-primary min-w-[100px]"
                  >{feature.linkText ? feature.linkText : "Try It"}</button
                >
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div> -->

<!-- <div class="hero min-h-[60vh] mt-12">
  <div class="hero-content text-center pb-16 pt-4 px-4">
    <div class="max-w-lg">
      <div
        class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mt-4 pb-2"
      >
        See it in Action
      </div>
      <div
        class="flex flex-col lg:flex-row mt-6 gap-6 place-content-center content-center"
      >
        <div class="hidden md:block">
          <a href="https://ai.methodology.city" target="_blank" class="link">
            <div class="mockup-browser border">
              <div class="mockup-browser-toolbar">
                <div class="input" style="background:#eee;">
                  https://ai.methodology.city
                </div>
              </div>
              <div class="flex justify-center">
                <img
                  alt="Screenshot of criticalmoments.io homepage"
                  class="aspect-[2044/1242]"
                  src="/images/example-home.png"
                />
              </div>
            </div>
          </a>
        </div>
        <div class="md:hidden">
          <a href="https://ai.methodology.city" target="_blank" class="link">
            <div class="card shadow-xl border overflow-hidden">
              <img
                alt="Screenshot of ai.programyzer.com website"
                class="aspect-[2044/1242]"
                src="/images/example-home.png"
              />
            </div></a
          >
        </div>
        <div class="min-w-[270px] lg:min-w-[420px] flex mt-6 lg:mt-0">
          <div class="my-auto">
            <div class="px-4 text-lg md:text-xl">
              <a href="https://ai.methodology.city" class="" target="_blank"
                >Programyzer serves as the primary gateway <span
                  class="font-bold whitespace-nowrap"
                  >to demonstrate
                </span>the capabilities of AI&#x2011;powered,
                <span class="underline decoration-secondary decoration-[3px]"
                  >unopinionated reasoning.</span
                ></a
              >
            </div>
            <div class="px-4 mt-6 text-lg md:text-xl">
              Explore <a
                href="https://huggingface.co/datasets/enikeev/tns_augmentoolkit"
                class="link font-medium"
                target="_blank">the dataset</a
              > generated from sample content to see how objective, data-driven insights
              are created.
            </div>
            <div class="mt-4 text-large">
              <a href="https://ai.methodology.city" target="_blank">
                <button class="btn btn-primary btn-wide mt-3"
                  >See it in Action</button
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->
