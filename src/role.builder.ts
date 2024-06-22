import { pathStyleForRole } from './utils.creep'

enum Task {
  Building = 'building',
  Harvesting = 'harvesting',
}

interface BuilderMemory extends CreepMemory {
  task: Task
}

interface Builder extends Creep {
  memory: BuilderMemory
}

const builderFromCreep = (creep: Creep): Builder => {
  const builder = creep as Builder
  if (!builder.memory.task) {
    if (builder.store.getFreeCapacity() > 0) {
      builder.memory.task = Task.Harvesting
    } else {
      builder.memory.task = Task.Building
    }
  }

  return builder
}

const isBuilding = (creep: Builder) => creep.memory.task === Task.Building
const isHarvesting = (creep: Builder) => creep.memory.task === Task.Harvesting

export default function builderRole(_creep: Creep) {
  const creep = builderFromCreep(_creep)

  if (isBuilding(creep) && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.task = Task.Harvesting
    creep.say('🔄 harvest')
  } else if (isHarvesting(creep) && creep.store.getFreeCapacity() === 0) {
    creep.memory.task = Task.Building
    creep.say('🚧 build')
  }

  switch (creep.memory.task) {
    case Task.Building:
      const target = creep.room.find(FIND_CONSTRUCTION_SITES)[0]
      if (target) {
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, pathStyleForRole('builder'))
        }
      }
      break
    case Task.Harvesting:
      const source = creep.room.find(FIND_SOURCES)[0]
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, pathStyleForRole('builder'))
      }
      break
  }
}
