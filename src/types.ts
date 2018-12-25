export interface ScoreNote {
  sec: number // music time
  type: 1 | 2 | 3 // 1: tap / flip 2: hold 3: hold + move
  finishPos: 1 | 2 | 3 | 4 | 5
  status: 0 | 1 | 2 // 0: tap 1: flip left 2: flip right
  sync: 0 | 1 // operate at the same time
  groupId: number // group id
}
