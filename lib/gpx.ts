// KD-tree node for 2D spatial search
interface KDNode {
  point: [number, number]; // [longitude, latitude]
  index: number;
  left?: KDNode | null;
  right?: KDNode | null;
}

// Build a KD-tree from waypoints
export const buildWaypointKDTree = (
  waypoints: Array<{ latitude: number; longitude: number }>
): KDNode | null => {
  const points: Array<{ point: [number, number]; index: number }> =
    waypoints.map((waypoint, index) => ({
      point: [waypoint.longitude, waypoint.latitude],
      index,
    }));

  const buildTree = (
    points: Array<{ point: [number, number]; index: number }>,
    depth: number = 0
  ): KDNode | null => {
    if (points.length === 0) return null;

    const axis = depth % 2; // 0 = longitude, 1 = latitude

    // Sort by the current axis
    points.sort((a, b) => a.point[axis] - b.point[axis]);

    const medianIndex = Math.floor(points.length / 2);
    const median = points[medianIndex];

    return {
      point: median.point,
      index: median.index,
      left: buildTree(points.slice(0, medianIndex), depth + 1),
      right: buildTree(points.slice(medianIndex + 1), depth + 1),
    };
  };

  return buildTree(points);
};

// Find the closest waypoint index to a given lat/lng using KD-tree
export const findClosestWaypointIndex = (
  tree: KDNode | null,
  targetLng: number,
  targetLat: number
): number | null => {
  if (!tree) return null;

  let closestIndex: number | null = null;
  let minDistance = Infinity;

  const searchTree = (node: KDNode, depth: number = 0): void => {
    const axis = depth % 2;
    const distance = calculateDistance(
      targetLat,
      targetLng,
      node.point[1], // latitude
      node.point[0] // longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = node.index;
    }

    const diff =
      axis === 0 ? targetLng - node.point[0] : targetLat - node.point[1];

    // Search the subtree that could contain closer points
    const first = diff <= 0 ? node.left : node.right;
    const second = diff <= 0 ? node.right : node.left;

    if (first) {
      searchTree(first, depth + 1);
    }

    // Check if we need to search the other subtree
    // (if the splitting plane is closer than current min distance)
    if (second && Math.abs(diff) < minDistance) {
      searchTree(second, depth + 1);
    }
  };

  searchTree(tree);
  return closestIndex;
};

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};
