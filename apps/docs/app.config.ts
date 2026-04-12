export default defineAppConfig({
  docus: {
    title: 'Recruitt Docs',
    description: 'Documentation for Recruitt Platform',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87ad7250-934c-4235-866d-1bf95ed6199c.png',
    socials: {
      github: 'Yves-Developer/recruitt'
    },
    aside: {
      level: 0,
      exclude: []
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: []
    },
    footer: {
      iconLinks: []
    },
    github: {
      dir: 'apps/docs/content',
      branch: 'main',
      repo: 'recruitt',
      owner: 'Yves-Developer',
      edit: true
    }
  }
})
