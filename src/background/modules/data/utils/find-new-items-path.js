export function newItemPaths(data, settings) {
  const traverseArray = [];
  const resultObject = {};

  function traverse(_data, _settings, currentPath) {
    const currentSetting = _settings[0];

    if (Number.isInteger(_data)) {
      return { [currentPath]: _data };
    }
    if (_data === undefined) {
      return undefined;
    }

    if (currentSetting === 'any') {
      return Object.keys(_data).forEach((key) => traverseArray.push(traverse(_data[key], _settings.slice(1), `${currentPath}/${key}`)));
    }
    return traverseArray.push(traverse(_data[currentSetting], _settings.slice(1), `${currentPath}/${currentSetting}`));
  }


  traverse(data, settings, '');
  for (let i = 0; i < traverseArray.length; i += 1) {
    const currentItem = traverseArray[i];
    if (currentItem !== undefined && !Number.isInteger(currentItem)) {
      const currentItemKey = Object.keys(currentItem)[0];
      resultObject[currentItemKey] = currentItem[currentItemKey];
    }
  }
  return resultObject;
}
