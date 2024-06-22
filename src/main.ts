import builderRole from './role.builder'
import harvesterRole from './role.harvester'
import upgraderRole from './role.upgrader'
import {
  canSpawnCreep,
  getCreepsByRole,
  releaseDeadCreeps,
  spawnCreep,
  Role,
} from './utils.creep'

export const loop = () => {
  releaseDeadCreeps()
  if (canSpawnCreep()) {
    const builders = getCreepsByRole(Role.Builder)
    const harvesters = getCreepsByRole(Role.Harvester)
    const upgraders = getCreepsByRole(Role.Upgrader)

    if (harvesters.length < 2) {
      console.log('Spawning harvester.')
      spawnCreep(Role.Harvester)
    } else if (builders.length < 2) {
      console.log('Spawning builder.')
      spawnCreep(Role.Builder)
    } else if (upgraders.length < 3) {
      console.log('Spawning upgrader.')
      spawnCreep(Role.Upgrader)
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    switch (creep.memory.role) {
      case Role.Builder:
        builderRole(creep)
        break
      case Role.Harvester:
        harvesterRole(creep)
        break
      case Role.Upgrader:
        upgraderRole(creep)
        break
    }
  }
}
