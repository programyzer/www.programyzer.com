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
  let showingSuppliers = false

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
    // Waymo suppliers
    jaguar: "https://logo.clearbit.com/jaguar.com",
    stellantis: "https://logo.clearbit.com/stellantis.com",
    volvo: "https://logo.clearbit.com/volvocars.com",
    geely:
      "https://img.logo.dev/zeekr.eu?token=pk_Yu3KDenwQuy7Mr1I3USKIA&retina=true",
    daimler: "https://logo.clearbit.com/daimler.com",
    renault: "https://logo.clearbit.com/renault.com",
    nissan: "https://logo.clearbit.com/nissan.com",
    toyota: "https://logo.clearbit.com/toyota.com",
    intel: "https://logo.clearbit.com/intel.com",
    google: "https://logo.clearbit.com/google.com",
    magna: "https://logo.clearbit.com/magna.com",
    americanaxle: "https://logo.clearbit.com/aam.com",
    lyft: "https://logo.clearbit.com/lyft.com",
    uber: "https://logo.clearbit.com/uber.com",
    via: "https://logo.clearbit.com/ridewithvia.com",
    ups: "https://logo.clearbit.com/ups.com",
    jbhunt: "https://logo.clearbit.com/jbhunt.com",
    chrobinson: "https://logo.clearbit.com/chrobinson.com",
    uberfreight: "https://logo.clearbit.com/uberfreight.com",
    doordash: "https://logo.clearbit.com/doordash.com",
    ubereats: "https://logo.clearbit.com/ubereats.com",
    autonation: "https://logo.clearbit.com/autonation.com",
    avis: "https://logo.clearbit.com/avis.com",
    ryder: "https://logo.clearbit.com/ryder.com",
    deepmind:
      "https://img.logo.dev/deepmind.com?token=pk_Yu3KDenwQuy7Mr1I3USKIA&retina=true",
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

  // Waymo suppliers data with HQ coordinates
  const WAYMO_SUPPLIERS = [
    {
      company: "Jaguar Land Rover",
      country: "UK",
      city: "Coventry",
      coords: [52.4068, -1.5197],
      logo: LOGOS.jaguar,
      category: "Chassis & Vehicle OEMs",
      partnership_year: "2018",
      source:
        "https://media.jaguarlandrover.com/en-us/news/2018/03/waymo-and-jaguar-land-rover-announce-long-term-partnership-beginning-self-driving-0",
    },
    {
      company: "Stellantis (FCA)",
      country: "USA/NL",
      city: "Amsterdam",
      coords: [52.3676, 4.9041],
      logo: LOGOS.stellantis,
      category: "Chassis & Vehicle OEMs",
      partnership_year: "2016",
      source:
        "https://waymo.com/blog/2020/07/waymo-and-fiat-chrysler-automobiles-fca-expand-partnership",
    },
    {
      company: "Volvo Car Group",
      country: "Sweden",
      city: "Gothenburg",
      coords: [57.7089, 11.9746],
      logo: LOGOS.volvo,
      category: "Chassis & Vehicle OEMs",
      partnership_year: "2020",
      source:
        "https://waymo.com/blog/2020/06/partnering-with-volvo-car-group-to-scale-the-waymo-driver",
    },
    {
      company: "Geely / Zeekr",
      country: "China",
      city: "Hangzhou",
      coords: [30.2741, 120.1551],
      logo: LOGOS.geely,
      category: "Chassis & Vehicle OEMs",
      partnership_year: "2021",
      source:
        "https://waymo.com/blog/2021/12/expanding-our-waymo-one-fleet-with",
    },
    {
      company: "Daimler Trucks",
      country: "Germany",
      city: "Stuttgart",
      coords: [48.7758, 9.1829],
      logo: LOGOS.daimler,
      category: "Chassis & Vehicle OEMs",
      partnership_year: "2020",
      source:
        "https://waymo.com/blog/2020/10/waymo-and-daimler-trucks-partner-to-develop-fully-autonomous-trucks",
    },
    {
      company: "Renault-Nissan Alliance",
      country: "France/Japan",
      city: "Boulogne-Billancourt",
      coords: [48.8566, 2.3522],
      logo: LOGOS.renault,
      category: "Chassis & Vehicle OEMs",
      partnership_year: "2019",
      source:
        "https://waymo.com/blog/2019/06/partnering-with-alliance-in-france-japan-and-beyond",
    },
    {
      company: "Toyota Motor Corporation",
      country: "Japan",
      city: "Toyota City",
      coords: [35.0833, 137.15],
      logo: LOGOS.toyota,
      category: "Chassis & Vehicle OEMs",
      partnership_year: "2025",
      source:
        "https://waymo.com/blog/2025/04/waymo-and-toyota-outline-strategic-partnership",
    },
    {
      company: "Intel Corporation",
      country: "USA",
      city: "Santa Clara",
      coords: [37.3875, -121.97],
      logo: LOGOS.intel,
      category: "Compute & Technology",
      partnership_year: "2017",
      source:
        "https://www.reuters.com/article/business/intel-collaborates-with-waymo-on-self-driving-computer-design-idUSKCN1BT1Z3",
    },
    {
      company: "Google Cloud / DeepMind",
      country: "USA",
      city: "Mountain View",
      coords: [37.4221, -122.0841],
      logo: LOGOS.deepmind,
      category: "Compute & Technology",
      partnership_year: "Ongoing",
      source: "https://cloud.google.com/customers/waymo",
    },
    {
      company: "Magna International",
      country: "Canada",
      city: "Aurora",
      coords: [44.0, -79.4667],
      logo: LOGOS.magna,
      category: "Assembly & Integration",
      partnership_year: "2025",
      source:
        "https://www.reuters.com/business/autos-transportation/waymo-partners-with-magna-new-vehicle-factory-arizona-2025-05-06/",
    },
    {
      company: "American Axle",
      country: "USA",
      city: "Detroit",
      coords: [42.3314, -83.0458],
      logo: LOGOS.americanaxle,
      category: "Assembly & Integration",
      partnership_year: "2019",
      source:
        "https://waymo.com/blog/2019/06/expanding-our-footprint-in-detroit",
    },
    {
      company: "Lyft Inc.",
      country: "USA",
      city: "San Francisco",
      coords: [37.7749, -122.4194],
      logo: LOGOS.lyft,
      category: "Ride-Hailing & Mobility",
      partnership_year: "2017",
      source:
        "https://techcrunch.com/2017/05/14/lyft-and-waymo-to-team-up-on-self-driving-cars/",
    },
    {
      company: "Uber Technologies",
      country: "USA",
      city: "San Francisco",
      coords: [37.7749, -122.4194],
      logo: LOGOS.uber,
      category: "Ride-Hailing & Mobility",
      partnership_year: "2022",
      source:
        "https://waymo.com/blog/2022/06/waymo-via-and-uber-freight-partner-to",
    },
    {
      company: "Via Transportation",
      country: "USA",
      city: "New York",
      coords: [40.7128, -74.006],
      logo: LOGOS.via,
      category: "Ride-Hailing & Mobility",
      partnership_year: "2025",
      source:
        "https://ridewithvia.com/news/waymo-and-via-announce-strategic-partnership-to-advance-avs-in-public-transit",
    },
    {
      company: "UPS Inc.",
      country: "USA",
      city: "Atlanta",
      coords: [33.749, -84.388],
      logo: LOGOS.ups,
      category: "Trucking & Logistics",
      partnership_year: "2020",
      source:
        "https://waymo.com/blog/2020/01/partnering-with-ups-to-deliver-on-our-mission",
    },
    {
      company: "J.B. Hunt Transport",
      country: "USA",
      city: "Lowell",
      coords: [36.2553, -94.1301],
      logo: LOGOS.jbhunt,
      category: "Trucking & Logistics",
      partnership_year: "2021",
      source:
        "https://waymo.com/blog/2021/06/waymo-via-is-working-with-jb-hunt-to-carry-freight-across-texas",
    },
    {
      company: "C.H. Robinson",
      country: "USA",
      city: "Eden Prairie",
      coords: [44.8547, -93.4707],
      logo: LOGOS.chrobinson,
      category: "Trucking & Logistics",
      partnership_year: "2022",
      source:
        "https://www.chrobinson.com/en-us/about-us/newsroom/press-releases/2022/02-16-22_chrobinson_and_waymo_enter_partnership/",
    },
    {
      company: "Uber Freight",
      country: "USA",
      city: "Chicago",
      coords: [41.8781, -87.6298],
      logo: LOGOS.uberfreight,
      category: "Trucking & Logistics",
      partnership_year: "2022",
      source:
        "https://waymo.com/blog/2022/06/waymo-via-and-uber-freight-partner-to",
    },
    {
      company: "DoorDash Inc.",
      country: "USA",
      city: "San Francisco",
      coords: [37.7749, -122.4194],
      logo: LOGOS.doordash,
      category: "Delivery & E-Commerce",
      partnership_year: "2025",
      source:
        "https://waymo.com/blog/2025/10/your-doordash-order-delivered-by-waymo",
    },
    {
      company: "Uber Eats",
      country: "USA",
      city: "San Francisco",
      coords: [37.7749, -122.4194],
      logo: LOGOS.ubereats,
      category: "Delivery & E-Commerce",
      partnership_year: "2024",
      source:
        "https://techcrunch.com/2024/04/17/uber-and-waymo-expand-partnership-to-include-autonomous-delivery-in-phoenix/",
    },
    {
      company: "AutoNation Inc.",
      country: "USA",
      city: "Fort Lauderdale",
      coords: [26.1224, -80.1373],
      logo: LOGOS.autonation,
      category: "Fleet Service & Maintenance",
      partnership_year: "2017-present",
      source:
        "https://www.prnewswire.com/news-releases/autonation-signs-multi-year-service-agreement-with-waymo-300547981.html",
    },
    {
      company: "Avis Budget Group",
      country: "USA",
      city: "Parsippany",
      coords: [40.8579, -74.4257],
      logo: LOGOS.avis,
      category: "Fleet Service & Maintenance",
      partnership_year: "2017-present",
      source:
        "https://www.reuters.com/article/business/avis-budget-group-to-partner-with-waymo-for-self-driving-car-program-idUSFWN1JN07X/",
    },
    {
      company: "Ryder System Inc.",
      country: "USA",
      city: "Miami",
      coords: [25.7617, -80.1918],
      logo: LOGOS.ryder,
      category: "Fleet Service & Maintenance",
      partnership_year: "2022-present",
      source:
        "https://waymo.com/blog/2022/06/waymo-via-and-ryder-partner-to-keep.html",
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

    // Expose functions to window for popup button access
    // @ts-expect-error - Adding to window object
    window.showSuppliersMap = showSuppliersMap
    // @ts-expect-error - Adding to window object
    window.showMainMap = showMainMap
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

        const isWaymo = d.company.includes("Waymo")
        const suppliersButton =
          isWaymo && !showingSuppliers
            ? `<div style="margin-top:8px;"><button onclick="window.showSuppliersMap()" style="background:#3b82f6;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Show suppliers</button></div>`
            : showingSuppliers
              ? `<div style="margin-top:8px;"><button onclick="window.showMainMap()" style="background:#6b7280;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Back to robotaxi map</button></div>`
              : ""

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
            ${suppliersButton}
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

        const hasWaymo = companies.some((d) => d.company.includes("Waymo"))
        const suppliersButton =
          hasWaymo && !showingSuppliers
            ? `<div style="margin-top:8px;"><button onclick="window.showSuppliersMap()" style="background:#3b82f6;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Show suppliers</button></div>`
            : showingSuppliers
              ? `<div style="margin-top:8px;"><button onclick="window.showMainMap()" style="background:#6b7280;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Back to robotaxi map</button></div>`
              : ""

        marker.bindPopup(`
          <div class="popup">
            <div style="font-weight:700;margin-bottom:12px;color:#333;">
              ${companies.length} Companies in ${companies[0].city}
            </div>
            ${popupContent}
            ${suppliersButton}
          </div>
        `)

        marker.addTo(map)
      }
    })
  }

  function showSuppliersMap() {
    showingSuppliers = true
    redrawSuppliersMap()
  }

  function showMainMap() {
    showingSuppliers = false
    redrawMainMap()
  }

  function redrawSuppliersMap() {
    // @ts-expect-error - Leaflet is loaded dynamically
    const L = window.L
    if (!L || !map) return

    // Clear all existing markers
    // @ts-expect-error - map is a Leaflet map instance
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        // @ts-expect-error - map is a Leaflet map instance
        map.removeLayer(layer)
      }
    })

    // Icon factory + markers (reuse from initMap)
    const iconCache: { [key: string]: unknown } = {}

    async function makeIcon(url: string) {
      const cacheKey = `${url}-supplier`
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

          // Add blue dot for suppliers
          ctx.fillStyle = "#3b82f6"
          ctx.beginPath()
          ctx.arc(24, 8, 4, 0, 2 * Math.PI)
          ctx.fill()
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 1
          ctx.stroke()

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

    // Group suppliers by coordinates to handle overlapping markers
    const groupedData: { [key: string]: typeof WAYMO_SUPPLIERS } = {}
    WAYMO_SUPPLIERS.forEach((d) => {
      const coordKey = `${d.coords[0]},${d.coords[1]}`
      if (!groupedData[coordKey]) {
        groupedData[coordKey] = []
      }
      groupedData[coordKey].push(d)
    })

    // Create markers for each coordinate group
    Object.entries(groupedData).forEach(async ([, suppliers]) => {
      if (suppliers.length === 1) {
        // Single supplier - create normal marker
        const d = suppliers[0]
        const icon = await makeIcon(d.logo)
        const marker = L.marker(d.coords, {
          icon: icon,
          title: `${d.company} — ${d.city}`,
        })

        marker.bindTooltip(`${d.company} — ${d.city}`, { sticky: true })

        // Supplier popup
        marker.bindPopup(`
          <div class="popup">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <img src="${d.logo}" alt="${d.company}" style="width:19px;height:19px;object-fit:contain;border-radius:4px;"/>
              <div>
                <div style="font-weight:700;">${d.company}</div>
                <div style="font-size:12px;color:#555;">${d.city}, ${d.country}</div>
              </div>
            </div>
            <div><span class="badge badge-blue">${d.category}</span></div>
            <div style="margin-top:4px;"><strong>Partnership:</strong> ${d.partnership_year}</div>
            <div style="margin-top:6px;"><a href="${d.source}" target="_blank" rel="noopener">Partnership source</a></div>
            <div style="margin-top:8px;"><button onclick="window.showMainMap()" style="background:#6b7280;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Back to robotaxi map</button></div>
          </div>
        `)

        marker.addTo(map)
      } else {
        // Multiple suppliers at same location - show first one
        const d = suppliers[0]
        const icon = await makeIcon(d.logo)
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
            <div><span class="badge badge-blue">${d.category}</span></div>
            <div style="margin-top:4px;"><strong>Partnership:</strong> ${d.partnership_year}</div>
            <div style="margin-top:6px;"><a href="${d.source}" target="_blank" rel="noopener">Partnership source</a></div>
            <div style="margin-top:8px;"><button onclick="window.showMainMap()" style="background:#6b7280;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Back to robotaxi map</button></div>
          </div>
        `)
        marker.addTo(map)
      }
    })

    // Fit map to show all suppliers
    if (WAYMO_SUPPLIERS.length > 0) {
      const group = new L.featureGroup()
      WAYMO_SUPPLIERS.forEach((d) => {
        group.addLayer(L.marker(d.coords))
      })
      // @ts-expect-error - map is a Leaflet map instance
      map.fitBounds(group.getBounds().pad(0.1))
    }
  }

  function redrawMainMap() {
    // @ts-expect-error - Leaflet is loaded dynamically
    const L = window.L
    if (!L || !map) return

    // Clear all existing markers
    // @ts-expect-error - map is a Leaflet map instance
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        // @ts-expect-error - map is a Leaflet map instance
        map.removeLayer(layer)
      }
    })

    // Icon factory + markers (reuse from initMap)
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

        const isWaymo = d.company.includes("Waymo")
        const suppliersButton = isWaymo
          ? `<div style="margin-top:8px;"><button onclick="window.showSuppliersMap()" style="background:#3b82f6;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Show suppliers</button></div>`
          : ""

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
            ${suppliersButton}
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

        const hasWaymo = companies.some((d) => d.company.includes("Waymo"))
        const suppliersButton = hasWaymo
          ? `<div style="margin-top:8px;"><button onclick="window.showSuppliersMap()" style="background:#3b82f6;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Show suppliers</button></div>`
          : ""

        marker.bindPopup(`
          <div class="popup">
            <div style="font-weight:700;margin-bottom:12px;color:#333;">
              ${companies.length} Companies in ${companies[0].city}
            </div>
            ${popupContent}
            ${suppliersButton}
          </div>
        `)
        marker.addTo(map)
      }
    })

    // Fit map to show all markers
    if (DATA.length > 0) {
      const group = new L.featureGroup()
      DATA.forEach((d) => {
        group.addLayer(L.marker(d.coords))
      })
      // @ts-expect-error - map is a Leaflet map instance
      map.fitBounds(group.getBounds().pad(0.1))
    }
  }

  async function makeClusterIcon(companies: typeof DATA) {
    // @ts-expect-error - Leaflet is loaded dynamically
    const L = window.L
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
        {#if showingSuppliers}
          🏭 Waymo Suppliers Map
        {:else}
          🚗 Robotaxi World Map
        {/if}
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        {#if showingSuppliers}
          Interactive map showing Waymo's confirmed partners and suppliers
          worldwide
        {:else}
          Interactive map showing companies operating fully driverless robotaxi
          services on public roads
        {/if}
      </p>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div bind:this={mapContainer} class="h-96 md:h-[600px]"></div>
    </div>

    <div class="mt-6 flex flex-col items-center gap-4">
      <div
        class="flex items-center gap-6 bg-white px-6 py-3 rounded-lg shadow-sm text-sm"
      >
        {#if showingSuppliers}
          <div class="flex items-center gap-2">
            <div
              class="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"
            ></div>
            <span class="text-gray-700">Waymo Suppliers</span>
          </div>
        {:else}
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
        {/if}
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

  :global(.badge-blue) {
    background: #3b82f6;
    color: white;
  }

  :global(.popup-company:last-child) {
    border-bottom: none !important;
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
</style>
