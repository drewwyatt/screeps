import { findSources } from './utils.creep'

export const run = (creep: Creep) => {
  const spawn = Game.spawns['Spawn1']
  const target = creep.room.controller

  if (findSources(creep)) return

  if (target && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}
