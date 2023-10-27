import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'alarms',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'sound', type: 'string' },
        { name: 'time_at', type: 'number'},
        { name: 'is_snooze', type: 'boolean' },
        { name: 'is_on', type: 'boolean'}
      ]
    }),
  ]
})

