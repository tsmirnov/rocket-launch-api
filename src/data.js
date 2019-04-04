import fetch from 'node-fetch'
import idx from 'idx'
import isUrl from './isUrl'

export let data

export default async () => {
  const res = await fetch('https://launchlibrary.net/1.4/launch?next=50&mode=verbose')
  const json = await res.json()
  data = json.launches.map(item => {
    const rocketName = idx(item, _ => _.rocket.name)
    const rocketWiki = idx(item, _ => _.rocket.wikiURL)
    const rocketImage = idx(item, _ => _.rocket.imageURL)
    const agencyName = idx(item, _ => _.lsp.name)
    const agencyWiki = idx(item, _ => _.lsp.wikiURL)
    const missionName = idx(item, _ => _.missions[0].name)
    const missionWiki = idx(item, _ => _.missions[0].wikiURL)
    const locationName = idx(item, _ => _.location.name)
    const locationUrl = idx(item, _ => _.location.pads[0].mapURL)

    let launchTime
    try {
      // netstamp in original API is unreliable
      launchTime = Date.parse(item.net)
    } catch (e) {
      console.log(`launchId: ${item.id}. Wrong date: ${item.net}`)
    }
    return {
      id: item.id,
      rocketName: rocketName ? rocketName.trim() : undefined,
      rocketWiki: isUrl(rocketWiki) ? rocketWiki : undefined,
      rocketImage: isUrl(rocketImage) && rocketImage !== 'https://s3.amazonaws.com/launchlibrary/RocketImages/placeholder_1920.png' ?
        rocketImage :
        undefined,
      agencyName: agencyName ? agencyName.trim() : undefined,
      agencyWiki: isUrl(agencyWiki) ? agencyWiki : undefined,
      missionName: missionName ? missionName.trim() : undefined,
      missionWiki: isUrl(missionWiki) ? missionWiki : undefined,
      locationName: locationName ? locationName.trim() : undefined,
      locationUrl: isUrl(locationUrl) ? locationUrl : undefined,
      launchTime,
    }
  })
}
