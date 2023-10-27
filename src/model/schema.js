import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'alarms',
      columns: [
        { name: 'id', type: 'number' },
        { name: 'name', type: 'string' },
        { name: 'repeat', type: 'boolean' },
        { name: 'sound', type: 'string' },
        { name: 'time', type: 'string'},
        { name: 'snooze', type: 'boolean' },
      ]
    }),
  ]
})

