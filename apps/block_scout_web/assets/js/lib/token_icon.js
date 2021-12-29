function getTokenIconUrl (chainID, addressHash) {
  return `https://cdn.kururu.finance/coins/eth/${chainID}/${addressHash.toLowerCase()}`
}

function appendTokenIcon ($tokenIconContainer, chainID, addressHash, foreignChainID, foreignAddressHash, displayTokenIcons, size) {
  const iconSize = size || 20
  let tokenIconURL = null
  if (foreignChainID) {
    tokenIconURL = getTokenIconUrl(foreignChainID.toString(), foreignAddressHash)
  } else if (chainID) {
    tokenIconURL = getTokenIconUrl(chainID.toString(), addressHash)
  }
  if (displayTokenIcons) {
    checkLink(tokenIconURL)
      .then(checkTokenIconLink => {
        if (checkTokenIconLink) {
          if ($tokenIconContainer) {
            const img = new Image(iconSize, iconSize)
            img.src = tokenIconURL
            img.className = 'mr-1'
            $tokenIconContainer.append(img)
          }
        }
      })
  }
}

async function checkLink (url) {
  if (url) {
    try {
      const res = await fetch(url)
      return res.ok
    } catch (_error) {
      return false
    }
  } else {
    return false
  }
}

export { appendTokenIcon, checkLink, getTokenIconUrl }
