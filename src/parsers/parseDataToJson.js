/**
 * @param {Array} data
 * @returns {Array<{filename: string, data: string}>}
 */
export const parseDataToJson = (data) =>
  data.map((vault) => {
    const records = (vault.records || [])
      .map((record) => {
        const data = record.data
          ? Object.fromEntries(
              Object.entries(record.data).filter(
                ([key]) => key !== 'attachments'
              )
            )
          : record.data
        return {
          ...record,
          ...(record.data ? { data } : {}),
          vaultName: vault.name
        }
      })
      .filter((r) => !!r.type)

    const json = JSON.stringify(records, null, 2)

    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_')
    const safeVaultName = vault.name.replace(/[^a-z0-9]/gi, '_')

    const filename = `PearPass_${safeVaultName}_${timestamp}.json`

    return {
      filename,
      data: json
    }
  })
