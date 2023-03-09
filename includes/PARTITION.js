// ciao ciao

function ref(table, flusso, fields) {
  var tableName = table.split('.').pop().replace('`', '');
  var partitions = null;
  try{
    partitions = JSON.parse(dataform.projectConfig.vars.partitions);
  }
  catch(err){
    partitions = JSON.parse(Buffer.from(dataform.projectConfig.vars.partitions, 'base64').toString());
  }
  var partitionDta = null;
  if(partitions.tables[tableName]){
    partitionDta = partitions.tables[tableName];
  }
  else if(partitions.streams[flusso]){
    partitionDta = partitions.streams[flusso];
  }
  return `
  (SELECT ${fields && fields.length > 0 ? fields.join(",") : "*"} FROM ${table} WHERE PARTITION_DTA = '${partitionDta}')
  `;
}

module.exports = {
  ref
}
