import { findSources, pathStyleForRole } from './utils.creep'

export default function UpgraderRole(creep: Creep) {
  const target = creep.room.controller

  if (findSources(creep)) return

  if (target && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, pathStyleForRole('upgrader'))
  }
}
