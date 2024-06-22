export const DEFAULT_CREEP = [WORK, MOVE, CARRY]

export const releaseDeadCreeps = () => {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name]
      console.log('Clearing non-existing creep memory:', name)
    }
  }
}

export const canSpawnCreep = () => spawnCreep(Role.Harvester, { dryRun: true }) === 0

export const spawnCreep = (
  role: Role,
  {
    body = DEFAULT_CREEP,
    dryRun,
    name = [role, Game.time].join(':'),
    spawn = Game.spawns['Spawn1'],
  }: {
    body?: BodyPartConstant[]
    dryRun?: boolean
    name?: string
    spawn?: StructureSpawn
  } = {},
) => spawn.spawnCreep(body, name, { dryRun, memory: { role } })

export enum Role {
  Builder = 'builder',
  Harvester = 'harvester',
  Upgrader = 'upgrader',
}
const PATH_STYLE: Record<Role, string> = {
  [Role.Builder]: '#fa0',
  [Role.Harvester]: '#fff',
  [Role.Upgrader]: '#00f',
}

export const pathStyle = (stroke: string) => ({ visualizePathStyle: { stroke } })
export const pathStyleForRole = (role: Role | `${Role}`) => pathStyle(PATH_STYLE[role])

export const findSources = (creep: Creep) => {
  const source = creep.room.find(FIND_SOURCES)[0]
  if (source && creep.store.getFreeCapacity() > 0) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source)
    }

    return true
  }

  return false
}

export const getCreepsByRole = (role: Role | `${Role}`): Creep[] =>
  _.filter(Game.creeps, (c: Creep) => c.memory.role === role)

declare global {
  interface CreepMemory {
    role: Role
  }
}
