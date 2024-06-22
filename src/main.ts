import * as harvester from './role.harvester'
import * as upgrader from './role.upgrader'
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
    const harvesters = getCreepsByRole(Role.Harvester)
    const upgraders = getCreepsByRole(Role.Upgrader)

    if (harvesters.length < 2) {
      console.log('Spawning harvester.')
      spawnCreep(Role.Harvester)
    } else if (upgraders.length < 3) {
      console.log('Spawning upgrader.')
      spawnCreep(Role.Upgrader)
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    switch (creep.memory.role) {
      case Role.Harvester:
        harvester.run(creep)
        break
      case Role.Upgrader:
        upgrader.run(creep)
        break
    }
  }
}
