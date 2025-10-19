<script lang="ts">
  import { onMount } from "svelte"
  import { WebsiteName } from "../../../config"

  // Readiness levels enum
  enum ReadinessLevel {
    FullyCommercialized = "Fully-commercialized",
    PreCommercialization = "Pre-commercialization",
  }

  let mapContainer: HTMLDivElement
  let map: unknown

  // PNG logos (using reliable logo APIs and verified sources)
  const LOGOS = {
    waymo: "https://logo.clearbit.com/waymo.com",
    cruise: "https://logo.clearbit.com/getcruise.com",
    apollo: "https://logo.clearbit.com/apollo.auto",
    pony: "https://logo.clearbit.com/pony.ai",
    autox: "https://logo.clearbit.com/autox.ai",
    weride: "https://logo.clearbit.com/weride.ai",
    yandex: "https://logo.clearbit.com/yandex.com",
    zoox: "https://logo.clearbit.com/zoox.com",
    tesla: "https://logo.clearbit.com/tesla.com",
  }

  // Data (fully driverless, public roads; city centers for coords)
  const DATA = [
    {
      company: "Tesla",
      readiness: ReadinessLevel.PreCommercialization,
      date: "April 2025",
      country: "USA",
      city: "Austin",
      coords: [30.2672, -97.7431],
      source: "https://www.bbc.com/news/articles/cjwnlje3yp1o",
      comment: "Planned: 10,000+",
      logo: LOGOS.tesla,
    },
    {
      company: "Waymo / Uber",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "March 2025",
      country: "USA",
      city: "Austin",
      coords: [30.2672, -97.7431],
      source:
        "https://investor.uber.com/news-events/news/press-release-details/2025/Ride-Into-the-Future-With-Waymo-on-Uber-in-Austin/default.aspx",
      comment: "~200 (test phase)",
      logo: LOGOS.waymo,
    },
    {
      company: "Waymo",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "October 2020",
      country: "USA",
      city: "Phoenix",
      coords: [33.4483, -112.074],
      source:
        "https://waymo.com/blog/2020/10/waymo-is-opening-its-fully-driverless-service-in-phoenix",
      comment: "~1,500",
      logo: LOGOS.waymo,
    },
    {
      company: "Waymo",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "June 2024",
      country: "USA",
      city: "San Francisco",
      coords: [37.7749, -122.4194],
      source:
        "https://waymo.com/blog/2024/06/waymo-one-is-now-open-to-everyone-in-san-francisco",
      comment: "~1,500",
      logo: LOGOS.waymo,
    },
    {
      company: "Waymo",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "November 2024",
      country: "USA",
      city: "Los Angeles",
      coords: [34.0522, -118.2437],
      source:
        "https://waymo.com/blog/2024/11/waymo-one-open-to-all-in-los-angeles",
      comment: "~1,000",
      logo: LOGOS.waymo,
    },
    {
      company: "Waymo",
      readiness: ReadinessLevel.PreCommercialization,
      date: "October 2025",
      country: "UK",
      city: "London",
      coords: [51.5072, -0.1276],
      source:
        "https://waymo.com/blog/2025/10/hello-london-your-waymo-ride-is-arriving",
      comment: "N/A",
      logo: LOGOS.waymo,
    },
    {
      company: "Baidu (Apollo Go)",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "August 2022",
      country: "China",
      city: "Wuhan",
      coords: [30.5928, 114.3055],
      source:
        "https://english.news.cn/20221227/720b7400018146ef90b3f02cdbb2765b/c.html",
      comment: ">1,000",
      logo: LOGOS.apollo,
    },
    {
      company: "Baidu (Apollo Go)",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "March 2023",
      country: "China",
      city: "Beijing",
      coords: [39.9042, 116.4074],
      source:
        "https://www.reuters.com/business/autos-transportation/baidu-launches-fully-driverless-taxi-service-beijing-2023-03-17",
      comment: ">1,000",
      logo: LOGOS.apollo,
    },
    {
      company: "Pony.ai",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "July 2025",
      country: "China",
      city: "Beijing",
      coords: [39.9042, 116.4074],
      source:
        "https://ir.pony.ai/news-releases/news-release-details/pony-ai-inc-among-first-receive-permit-fully-driverless?utm_source=chatgpt.com",
      comment: "N/A",
      logo: LOGOS.pony,
    },
    {
      company: "Pony.ai",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "December 2023",
      country: "China",
      city: "Guangzhou",
      coords: [23.1291, 113.2644],
      source: "https://www.chinadailyhk.com/hk/article/620839",
      comment: "Commercial driverless trial (Nansha district)",
      logo: LOGOS.pony,
    },
    {
      company: "Pony.ai",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "January 2024",
      country: "China",
      city: "Shenzhen",
      coords: [22.5431, 114.0579],
      source: "https://www.chinadailyhk.com/hk/article/620839",
      comment: "Commercial pilot license (Bao’an district)",
      logo: LOGOS.pony,
    },
    {
      company: "Pony.ai",
      readiness: ReadinessLevel.PreCommercialization,
      date: "April 2025",
      country: "Luxembourg",
      city: "Luxembourg",
      coords: [49.6116, 6.1319],
      source:
        "https://www.prnewswire.com/news-releases/ponyai-europe-secures-luxembourg-robotaxi-testing-permit-302419742.html?utm_source=chatgpt.com",
      comment: "Permit granted",
      logo: LOGOS.pony,
    },
    {
      company: "Pony.ai",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "July 2025",
      country: "China",
      city: "Shanghai",
      coords: [31.2304, 121.4737],
      source: "https://www.chinadailyhk.com/hk/article/620839",
      comment: "Demonstration permit for intelligent connected vehicles",
      logo: LOGOS.pony,
    },
    {
      company: "AutoX (Alibaba)",
      readiness: ReadinessLevel.FullyCommercialized,
      date: "January 2021",
      country: "China",
      city: "Shenzhen",
      coords: [22.5431, 114.0579],
      source:
        "https://www.forbes.com/sites/davidsilver/2021/01/27/autox-launches-driverless-roboaxis-in-shenzhen/",
      comment: "N/A",
      logo: LOGOS.autox,
    },
    {
      company: "WeRide",
      readiness: ReadinessLevel.PreCommercialization,
      date: "May 2025",
      country: "UAE",
      city: "Abu Dhabi",
      coords: [24.4539, 54.3773],
      source:
        "https://ir.weride.ai/news-releases/news-release-details/weride-launches-fully-driverless-robotaxi-trial-operations-abu",
      comment: "N/A",
      logo: LOGOS.weride,
    },
    {
      company: "Yandex",
      readiness: ReadinessLevel.PreCommercialization,
      date: "October 2023",
      country: "Russia",
      city: "Innopolis",
      coords: [55.752, 48.7445],
      source: "https://interfax.com/newsroom/top-stories/95806/",
      comment: "N/A",
      logo: LOGOS.yandex,
    },
  ]

  onMount(async () => {
    // Load Leaflet CSS and JS
    const cssLink = document.createElement("link")
    cssLink.rel = "stylesheet"
    cssLink.href = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(cssLink)

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"

    script.onload = () => {
      initMap()
    }

    document.head.appendChild(script)
  })

  function initMap() {
    // @ts-expect-error - Leaflet is loaded dynamically
    const L = window.L
    if (!L || !mapContainer) return

    // Init map
    map = L.map(mapContainer, { worldCopyJump: true }).setView([25, 10], 2)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)

    // Icon factory + markers
    const iconCache: { [key: string]: unknown } = {}

    async function makeIcon(url: string, readiness: ReadinessLevel) {
      const cacheKey = `${url}-${readiness}`
      if (iconCache[cacheKey]) return iconCache[cacheKey]

      // Create a canvas to draw the logo with status dot
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        return L.icon({
          iconUrl: url,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
          className: "logo-icon",
        })
      }

      canvas.width = 32
      canvas.height = 32

      // Create image element to load the logo
      const img = new Image()
      img.crossOrigin = "anonymous"

      return new Promise((resolve) => {
        img.onload = () => {
          // Save the canvas state
          ctx.save()

          // Create circular clipping path for the logo
          ctx.beginPath()
          ctx.arc(16, 16, 13, 0, 2 * Math.PI)
          ctx.clip()

          // Draw the logo in the center, leaving space for the dot
          ctx.drawImage(img, 3, 3, 26, 26)

          // Reset clipping path
          ctx.restore()

          // Add status dot based on readiness
          if (readiness === ReadinessLevel.PreCommercialization) {
            // Yellow dot
            ctx.fillStyle = "#fbbf24"
            ctx.beginPath()
            ctx.arc(24, 8, 4, 0, 2 * Math.PI)
            ctx.fill()
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 1
            ctx.stroke()
          } else if (readiness === ReadinessLevel.FullyCommercialized) {
            // Green dot
            ctx.fillStyle = "#10b981"
            ctx.beginPath()
            ctx.arc(24, 8, 4, 0, 2 * Math.PI)
            ctx.fill()
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 1
            ctx.stroke()
          }

          const icon = L.icon({
            iconUrl: canvas.toDataURL(),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
            className: "logo-icon",
          })

          iconCache[cacheKey] = icon
          resolve(icon)
        }

        img.onerror = () => {
          // Fallback to original logo if image fails to load
          const fallbackIcon = L.icon({
            iconUrl: url,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
            className: "logo-icon",
          })
          iconCache[cacheKey] = fallbackIcon
          resolve(fallbackIcon)
        }

        img.src = url
      })
    }

    async function makeClusterIcon(companies: typeof DATA) {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        return L.icon({
          iconUrl: LOGOS.waymo, // fallback
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
          className: "logo-icon",
        })
      }

      canvas.width = 40
      canvas.height = 40

      // Create a circular background
      ctx.fillStyle = "#3b82f6"
      ctx.beginPath()
      ctx.arc(20, 20, 18, 0, 2 * Math.PI)
      ctx.fill()

      // Add white border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 3
      ctx.stroke()

      // Add company count text
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(companies.length.toString(), 20, 20)

      // Add small status indicators for each company
      const statusColors = companies.map((c) =>
        c.readiness === ReadinessLevel.FullyCommercialized
          ? "#10b981"
          : "#fbbf24",
      )

      // Draw small dots around the edge to show status mix
      statusColors.forEach((color, index) => {
        const angle = (index * 2 * Math.PI) / statusColors.length
        const x = 20 + Math.cos(angle) * 12
        const y = 20 + Math.sin(angle) * 12

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, 2 * Math.PI)
        ctx.fill()
      })

      return L.icon({
        iconUrl: canvas.toDataURL(),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: "cluster-icon",
      })
    }

    // Group data by coordinates to handle overlapping markers
    const groupedData: { [key: string]: typeof DATA } = {}
    DATA.forEach((d) => {
      const coordKey = `${d.coords[0]},${d.coords[1]}`
      if (!groupedData[coordKey]) {
        groupedData[coordKey] = []
      }
      groupedData[coordKey].push(d)
    })

    // Create markers for each coordinate group
    Object.entries(groupedData).forEach(async ([, companies]) => {
      if (companies.length === 1) {
        // Single company - create normal marker
        const d = companies[0]
        const icon = await makeIcon(d.logo, d.readiness)
        const marker = L.marker(d.coords, {
          icon: icon,
          title: `${d.company} — ${d.city}`,
        })

        marker.bindTooltip(`${d.company} — ${d.city}`, { sticky: true })

        marker.bindPopup(`
          <div class="popup">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <img src="${d.logo}" alt="${d.company}" style="width:19px;height:19px;object-fit:contain;border-radius:4px;"/>
              <div>
                <div style="font-weight:700;">${d.company}</div>
                <div style="font-size:12px;color:#555;">${d.city}, ${d.country}</div>
              </div>
            </div>
            <div><span class="badge ${d.readiness === ReadinessLevel.FullyCommercialized ? "badge-green" : "badge-yellow"}">${d.readiness}</span></div>
            <div style="margin-top:4px;"><strong>Started:</strong> ${d.date}</div>
            <div><strong>comment:</strong> ${d.comment}</div>
            <div style="margin-top:6px;"><a href="${d.source}" target="_blank" rel="noopener">Launch source</a></div>
          </div>
        `)

        marker.addTo(map)
      } else {
        // Multiple companies - create cluster marker
        const clusterIcon = await makeClusterIcon(companies)
        const marker = L.marker(companies[0].coords, {
          icon: clusterIcon,
          title: `${companies.length} companies in ${companies[0].city}`,
        })

        marker.bindTooltip(
          `${companies.length} companies in ${companies[0].city}`,
          { sticky: true },
        )

        // Create popup with all companies
        const popupContent = companies
          .map(
            (d) => `
          <div class="popup-company" style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #eee;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <img src="${d.logo}" alt="${d.company}" style="width:19px;height:19px;object-fit:contain;border-radius:4px;"/>
              <div>
                <div style="font-weight:700;">${d.company}</div>
                <div style="font-size:12px;color:#555;">${d.city}, ${d.country}</div>
              </div>
            </div>
            <div><span class="badge ${d.readiness === ReadinessLevel.FullyCommercialized ? "badge-green" : "badge-yellow"}">${d.readiness}</span></div>
            <div style="margin-top:4px;"><strong>Started:</strong> ${d.date}</div>
            <div><strong>comment:</strong> ${d.comment}</div>
            <div style="margin-top:6px;"><a href="${d.source}" target="_blank" rel="noopener">Launch source</a></div>
          </div>
        `,
          )
          .join("")

        marker.bindPopup(`
          <div class="popup">
            <div style="font-weight:700;margin-bottom:12px;color:#333;">
              ${companies.length} Companies in ${companies[0].city}
            </div>
            ${popupContent}
          </div>
        `)

        marker.addTo(map)
      }
    })
  }
</script>

<svelte:head>
  <title>Robotaxi (fully driverless) — {WebsiteName}</title>
  <meta
    name="description"
    content="Interactive world map showing robotaxi companies operating fully driverless vehicles on public roads."
  />
  <meta name="og:title" content="Robotaxi (fully driverless) — {WebsiteName}" />
  <meta
    name="og:description"
    content="Interactive world map showing robotaxi companies operating fully driverless vehicles on public roads."
  />
  <meta name="og:type" content="website" />
  <meta name="robots" content="index,follow" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        🚗 Robotaxi World Map
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Interactive map showing companies operating fully driverless robotaxi
        services on public roads
      </p>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div bind:this={mapContainer} class="h-96 md:h-[600px]"></div>
    </div>

    <div class="mt-6 flex flex-col items-center gap-4">
      <div
        class="flex items-center gap-6 bg-white px-6 py-3 rounded-lg shadow-sm text-sm"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-sm"
          ></div>
          <span class="text-gray-700">Pre-commercialization</span>
        </div>
        <div class="flex items-center gap-2">
          <div
            class="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"
          ></div>
          <span class="text-gray-700">Fully-commercialized</span>
        </div>
      </div>

      <div
        class="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-sm text-gray-600"
      >
        <span>Generated on {new Date().toISOString().split("T")[0]}</span>
        <span>•</span>
        <span>Base map © OpenStreetMap contributors</span>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.logo-icon) {
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }

  :global(.cluster-icon) {
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
  }

  :global(.cluster-icon:hover) {
    transform: scale(1.1);
  }

  :global(.popup a) {
    word-break: break-all;
  }

  :global(.badge) {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 12px;
  }

  :global(.badge-green) {
    background: #10b981;
    color: white;
  }

  :global(.badge-yellow) {
    background: #fbbf24;
    color: #1f2937;
  }

  :global(.popup-company:last-child) {
    border-bottom: none !important;
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
</style>
