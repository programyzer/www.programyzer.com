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

  //   const features = [
  //     {
  //       name: "Open Source",
  //       link: "https://github.com/programyzer",
  //       linkText: "GitHub",
  //       newPage: true,
  //       description:
  //         "The DNA of openness empowers us to build solutions that benefit everyone.",
  //       svgContent: `<path d="M12.75 6.5C12.75 6.08579 12.4142 5.75 12 5.75C11.5858 5.75 11.25 6.08579 11.25 6.5H12.75ZM18 16.5L18.5303 17.0303C18.8232 16.7374 18.8232 16.2626 18.5303 15.9697L18 16.5ZM15.9697 17.4697C15.6768 17.7626 15.6768 18.2374 15.9697 18.5303C16.2626 18.8232 16.7374 18.8232 17.0303 18.5303L15.9697 17.4697ZM17.0303 14.4697C16.7374 14.1768 16.2626 14.1768 15.9697 14.4697C15.6768 14.7626 15.6768 15.2374 15.9697 15.5303L17.0303 14.4697ZM11.25 6.5V12.5H12.75V6.5H11.25ZM16 17.25H18V15.75H16V17.25ZM17.4697 15.9697L15.9697 17.4697L17.0303 18.5303L18.5303 17.0303L17.4697 15.9697ZM18.5303 15.9697L17.0303 14.4697L15.9697 15.5303L17.4697 17.0303L18.5303 15.9697ZM11.25 12.5C11.25 15.1234 13.3766 17.25 16 17.25V15.75C14.2051 15.75 12.75 14.2949 12.75 12.5H11.25Z" fill="#1C274C"/>
  // <path d="M12.75 6.5C12.75 6.08579 12.4142 5.75 12 5.75C11.5858 5.75 11.25 6.08579 11.25 6.5H12.75ZM6 16.5L5.46967 15.9697C5.17678 16.2626 5.17678 16.7374 5.46967 17.0303L6 16.5ZM6.96967 18.5303C7.26256 18.8232 7.73744 18.8232 8.03033 18.5303C8.32322 18.2374 8.32322 17.7626 8.03033 17.4697L6.96967 18.5303ZM8.03033 15.5303C8.32322 15.2374 8.32322 14.7626 8.03033 14.4697C7.73744 14.1768 7.26256 14.1768 6.96967 14.4697L8.03033 15.5303ZM11.25 6.5V12.5H12.75V6.5H11.25ZM8 15.75H6V17.25H8V15.75ZM5.46967 17.0303L6.96967 18.5303L8.03033 17.4697L6.53033 15.9697L5.46967 17.0303ZM6.53033 17.0303L8.03033 15.5303L6.96967 14.4697L5.46967 15.9697L6.53033 17.0303ZM11.25 12.5C11.25 14.2949 9.79493 15.75 8 15.75V17.25C10.6234 17.25 12.75 15.1234 12.75 12.5H11.25Z" fill="#1C274C"/>
  // <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
  // `,
  //     },
  //     {
  //       name: "Network States",
  //       description:
  //         "Co-create a visionary digital society grounded in shared ideals and continuous innovation.",
  //       link: "https://thenetworkstate.com",
  //       linkText: "Theory",
  //       newPage: true,
  //       svgContent: `<path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="#1C274C" stroke-width="1.5"/>
  // <path d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10" stroke="#1C274C" stroke-width="1.5"/>
  // <path d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14" stroke="#1C274C" stroke-width="1.5"/>`,
  //     },
  //     {
  //       name: "Declarations",
  //       description:
  //         "Enable members to formalize their commitment to shared values and governance principles.",
  //       linkText: "Agreement",
  //       newPage: true,
  //       link: "https://github.com/Montelibero/MTLA-Documents/blob/main/Internal/Agreement/Agreement.en.md",
  //       svgContent: `<path d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="#1C274C" stroke-width="1.5"/>
  // <path d="M6 12C6 10.5858 6 9.87868 6.43934 9.43934C6.87868 9 7.58579 9 9 9H15C16.4142 9 17.1213 9 17.5607 9.43934C18 9.87868 18 10.5858 18 12V16C18 17.4142 18 18.1213 17.5607 18.5607C17.1213 19 16.4142 19 15 19H9C7.58579 19 6.87868 19 6.43934 18.5607C6 18.1213 6 17.4142 6 16V12Z" stroke="#1C274C" stroke-width="1.5"/>
  // <path d="M7 6H12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
  //     },
  //     {
  //       name: "Screening",
  //       link: "/login",
  //       linkText: "Apply",
  //       description:
  //         "Ensure a strong cultural fit for new joiners by aligning their values, goals and expectations.",
  //       svgContent: `
  // <path d="M0.90625 12.4866C1.01075 6.46069 5.22856 2.1707 10.3917 1.47632C16.551 0.652008 21.732 4.84163 22.7275 10.3994C23.6728 15.6704 20.7757 20.6046 15.9989 22.5599C15.5871 22.7276 15.3616 22.6348 15.2042 22.2161L12.8302 16.0499C12.6948 15.6876 12.7869 15.4621 13.1417 15.3019C14.2162 14.8145 14.8852 13.9984 15.0646 12.8269C15.3472 11.0119 14.0334 9.33651 12.2039 9.17838C10.5381 9.01682 9.03525 10.1773 8.76644 11.8273C8.53337 13.2924 9.25663 14.6564 10.6206 15.2758C11.0469 15.469 11.1328 15.6588 10.9678 16.0926L8.58287 22.3014C8.46806 22.6059 8.21781 22.7139 7.89537 22.5881C5.37844 21.6036 3.31181 19.7233 2.09494 17.3101C0.98875 15.1259 0.978437 13.4182 0.90625 12.4832V12.4866ZM1.83369 12.4014C1.85225 12.6949 1.86188 13.0346 1.89144 13.3824C2.16988 16.5724 4.08937 19.7487 7.70219 21.5066C7.84587 21.5706 7.8995 21.5424 7.95312 21.4069C8.61244 19.6696 9.27794 17.9337 9.94756 16.1964C10.0046 16.0534 9.97575 15.9853 9.84306 15.9028C8.43987 15.018 7.74137 13.7503 7.81975 12.0858C7.86306 11.1295 8.23225 10.288 8.87644 9.58607C10.2047 8.13613 12.2919 7.82057 14.0004 8.80576C15.4111 9.62182 16.1983 11.201 16.0051 12.8201C15.8436 14.1731 15.1499 15.2119 13.9749 15.9138C13.8567 15.9853 13.8209 16.0424 13.8753 16.1813C14.5483 17.922 15.2179 19.6621 15.88 21.4028C15.9343 21.5424 15.9879 21.5706 16.1275 21.5025C17.7067 20.7683 19.0205 19.7157 20.038 18.3125C21.5807 16.1709 22.2181 13.7894 21.9135 11.1687C21.3085 5.9547 16.6177 1.63651 10.5773 2.38176C5.87206 2.95857 1.91206 6.92957 1.833 12.4007L1.83369 12.4014Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" stroke-linecap="round"/>
  //       `,
  //     },
  //     {
  //       name: "Performance",
  //       link: "/login",
  //       linkText: "Join",
  //       description:
  //         "Output-focused, prosumer-driven community, designed to foster coopetition.",
  //       svgContent: `<path d="M5.66953 9.91436L8.73167 5.77133C10.711 3.09327 11.7007 1.75425 12.6241 2.03721C13.5474 2.32018 13.5474 3.96249 13.5474 7.24712V7.55682C13.5474 8.74151 13.5474 9.33386 13.926 9.70541L13.946 9.72466C14.3327 10.0884 14.9492 10.0884 16.1822 10.0884C18.4011 10.0884 19.5106 10.0884 19.8855 10.7613C19.8917 10.7724 19.8977 10.7837 19.9036 10.795C20.2576 11.4784 19.6152 12.3475 18.3304 14.0857L15.2683 18.2287C13.2889 20.9067 12.2992 22.2458 11.3758 21.9628C10.4525 21.6798 10.4525 20.0375 10.4525 16.7528L10.4526 16.4433C10.4526 15.2585 10.4526 14.6662 10.074 14.2946L10.054 14.2754C9.6673 13.9117 9.05079 13.9117 7.81775 13.9117C5.59888 13.9117 4.48945 13.9117 4.1145 13.2387C4.10829 13.2276 4.10225 13.2164 4.09639 13.205C3.74244 12.5217 4.3848 11.6526 5.66953 9.91436Z" stroke="#1C274C" stroke-width="1.5"/>`,
  //     },
  //     {
  //       name: "Business Games",
  //       link: "https://gameoffounders.com",
  //       linkText: "Play",
  //       newPage: true,
  //       description:
  //         "The connecting force that aligns members, enabling cooperation, and the pursuit of shared goals.",
  //       svgContent: `
  //       <circle cx="10" cy="6" r="4" stroke="#1C274C" stroke-width="1.5"/>
  // <path d="M18 17.5C18 19.9853 18 22 10 22C2 22 2 19.9853 2 17.5C2 15.0147 5.58172 13 10 13C14.4183 13 18 15.0147 18 17.5Z" stroke="currentColor" stroke-width="1.5"/>
  // <path d="M18.0885 12.5385L18.5435 11.9423L18.0885 12.5385ZM19 8.64354L18.4681 9.17232C18.6089 9.31392 18.8003 9.39354 19 9.39354C19.1997 9.39354 19.3911 9.31392 19.5319 9.17232L19 8.64354ZM19.9115 12.5385L19.4565 11.9423L19.9115 12.5385ZM18.5435 11.9423C18.0571 11.571 17.619 11.274 17.2659 10.8891C16.9387 10.5324 16.75 10.1638 16.75 9.69973H15.25C15.25 10.6481 15.6642 11.362 16.1606 11.9031C16.6311 12.4161 17.2372 12.8322 17.6335 13.1347L18.5435 11.9423ZM16.75 9.69973C16.75 9.28775 16.9898 8.95469 17.2973 8.81862C17.5635 8.7008 17.9874 8.68874 18.4681 9.17232L19.5319 8.11476C18.6627 7.24047 17.5865 7.0503 16.6903 7.44694C15.8352 7.82533 15.25 8.69929 15.25 9.69973H16.75ZM17.6335 13.1347C17.7825 13.2483 17.9756 13.3959 18.1793 13.5111C18.3832 13.6265 18.6656 13.75 19 13.75V12.25C19.0344 12.25 19.0168 12.2615 18.9179 12.2056C18.8187 12.1495 18.7061 12.0663 18.5435 11.9423L17.6335 13.1347ZM20.3665 13.1347C20.7628 12.8322 21.3689 12.4161 21.8394 11.9031C22.3358 11.362 22.75 10.6481 22.75 9.69973H21.25C21.25 10.1638 21.0613 10.5324 20.7341 10.8891C20.381 11.274 19.9429 11.571 19.4565 11.9423L20.3665 13.1347ZM22.75 9.69973C22.75 8.69929 22.1648 7.82533 21.3097 7.44694C20.4135 7.0503 19.3373 7.24047 18.4681 8.11476L19.5319 9.17232C20.0126 8.68874 20.4365 8.7008 20.7027 8.81862C21.0102 8.95469 21.25 9.28775 21.25 9.69973H22.75ZM19.4565 11.9423C19.2939 12.0663 19.1813 12.1495 19.0821 12.2056C18.9832 12.2615 18.9656 12.25 19 12.25V13.75C19.3344 13.75 19.6168 13.6265 19.8207 13.5111C20.0244 13.3959 20.2175 13.2483 20.3665 13.1347L19.4565 11.9423Z" fill="currentColor"/>
  //       `,
  //     },
  //     {
  //       name: "Scale",
  //       link: "/login",
  //       linkText: "Execute",
  //       description:
  //         "Onboard members and scale with mentorship and shared values to drive collective growth.",
  //       svgContent: `<path d="M3 22H21" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  // <path d="M3 11C3 10.0572 3 9.58579 3.29289 9.29289C3.58579 9 4.05719 9 5 9C5.94281 9 6.41421 9 6.70711 9.29289C7 9.58579 7 10.0572 7 11V17C7 17.9428 7 18.4142 6.70711 18.7071C6.41421 19 5.94281 19 5 19C4.05719 19 3.58579 19 3.29289 18.7071C3 18.4142 3 17.9428 3 17V11Z" stroke="#1C274C" stroke-width="1.5"/>
  // <path d="M10 7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5C12.9428 5 13.4142 5 13.7071 5.29289C14 5.58579 14 6.05719 14 7V17C14 17.9428 14 18.4142 13.7071 18.7071C13.4142 19 12.9428 19 12 19C11.0572 19 10.5858 19 10.2929 18.7071C10 18.4142 10 17.9428 10 17V7Z" stroke="#1C274C" stroke-width="1.5"/>
  // <path d="M17 4C17 3.05719 17 2.58579 17.2929 2.29289C17.5858 2 18.0572 2 19 2C19.9428 2 20.4142 2 20.7071 2.29289C21 2.58579 21 3.05719 21 4V17C21 17.9428 21 18.4142 20.7071 18.7071C20.4142 19 19.9428 19 19 19C18.0572 19 17.5858 19 17.2929 18.7071C17 18.4142 17 17.9428 17 17V4Z" stroke="#1C274C" stroke-width="1.5"/>`,
  //     },
  //     {
  //       name: "Financials",
  //       link: "/pricing",
  //       linkText: "Explore",
  //       description:
  //         "Enable sustainable economic activity and growth opportunities for everybody.",
  //       svgContent: `<path d="M12 6V18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
  // <path d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
  // <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
  //     },
  //     {
  //       name: "Contact Us",
  //       link: "/contact_us",
  //       linkText: "Write",
  //       description:
  //         "Feel free to reach out and experience unopinionated reasoning.",
  //       svgContent: `<path d="M10.5 22V20M14.5 22V20" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
  // <path d="M11 20V20.75H11.75V20H11ZM14 19.25C13.5858 19.25 13.25 19.5858 13.25 20C13.25 20.4142 13.5858 20.75 14 20.75V19.25ZM17.5 5.25C17.0858 5.25 16.75 5.58579 16.75 6C16.75 6.41421 17.0858 6.75 17.5 6.75V5.25ZM7 5.25C6.58579 5.25 6.25 5.58579 6.25 6C6.25 6.41421 6.58579 6.75 7 6.75V5.25ZM9 19.25C8.58579 19.25 8.25 19.5858 8.25 20C8.25 20.4142 8.58579 20.75 9 20.75V19.25ZM15 20.75C15.4142 20.75 15.75 20.4142 15.75 20C15.75 19.5858 15.4142 19.25 15 19.25V20.75ZM10.25 11.25V20H11.75V11.25H10.25ZM11 19.25H4.23256V20.75H11V19.25ZM2.75 17.3953V11.25H1.25V17.3953H2.75ZM4.23256 19.25C3.51806 19.25 2.75 18.5323 2.75 17.3953H1.25C1.25 19.1354 2.48104 20.75 4.23256 20.75V19.25ZM6.5 6.75C8.46677 6.75 10.25 8.65209 10.25 11.25H11.75C11.75 8.04892 9.50379 5.25 6.5 5.25V6.75ZM6.5 5.25C3.49621 5.25 1.25 8.04892 1.25 11.25H2.75C2.75 8.65209 4.53323 6.75 6.5 6.75V5.25ZM21.25 11.25V17.4253H22.75V11.25H21.25ZM19.7931 19.25H14V20.75H19.7931V19.25ZM21.25 17.4253C21.25 18.5457 20.4934 19.25 19.7931 19.25V20.75C21.5305 20.75 22.75 19.1488 22.75 17.4253H21.25ZM22.75 11.25C22.75 8.04892 20.5038 5.25 17.5 5.25V6.75C19.4668 6.75 21.25 8.65209 21.25 11.25H22.75ZM7 6.75H18V5.25H7V6.75ZM9 20.75H15V19.25H9V20.75Z" fill="#1C274C"/>
  // <path d="M5 16H8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
  // <path d="M16 9.88432V5.41121M16 5.41121V2.63519C16 2.39905 16.1676 2.19612 16.3994 2.15144L16.8855 2.05779C17.4738 1.94443 18.0821 1.99855 18.6412 2.214L18.7203 2.24451C19.2746 2.4581 19.8807 2.498 20.4582 2.35891C20.7343 2.2924 21 2.50168 21 2.78573V5.00723C21 5.2442 20.8376 5.45031 20.6073 5.5058L20.5407 5.52184C19.9095 5.67387 19.247 5.63026 18.6412 5.39679C18.0821 5.18135 17.4738 5.12722 16.8855 5.24058L16 5.41121Z" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>`,
  //     },
  //   ]
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
        What I do
      </div>

      <div
        class="text-4xl md:text-6xl font-bold px-2"
        style="line-height: 1.2;"
      >
        <span>Unopinionated</span>
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >AI&#x2011;powered</span
        >
        <span>reasoning</span>
      </div>
      <div class="mt-6 md:mt-10 text-sm md:text-lg">
        Let’s start the conversation today
      </div>
      <div class="mt-6 md:mt-2">
        <a href="/contact_us">
          <button class="btn btn-primary btn-sm px-6">Email Now</button>
        </a>
        <button
          data-cal-link="enikeev/60min"
          data-cal-namespace="60min"
          class="btn btn-outline btn-primary btn-sm px-6 mt-3 mx-2"
          >Book a Call
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
