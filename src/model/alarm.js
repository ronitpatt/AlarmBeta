import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Alarm extends Model {
  static table = 'alarms'
  @text('name') name
  @field('repeat') repeat
  @field('sound') sound
  @date('time_at') timeAt
  @field('is_snooze') isSnooze
  @field('is_on') isOn
}