function ghostIsSkipped(list) {
    const host = location.hostname.replace(/^www\./, "");
    return list.some((site) => host === site ||host.endsWith("."+site));
}