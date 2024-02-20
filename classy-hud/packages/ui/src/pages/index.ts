import Hud from './hud/Hud'

const appPages = {
  Hud: Hud,
}

function generatePageList() {
  const pages: { name: string; page: any }[] = []
  Object.keys(appPages).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pages.push({ name: key, page: appPages[key] })
  })
  return pages
}

export { appPages, generatePageList }
