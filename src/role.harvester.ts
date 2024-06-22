import { findSources } from './utils.creep'

export const run = (creep: Creep) => {
  const spawn = Game.spawns['Spawn1']
  if (findSources(creep)) return

  if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn)
  }
}
