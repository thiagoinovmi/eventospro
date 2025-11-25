const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MercadoPagoCheckout-CjX8ufZs.js","assets/mixins-CO2EmGtw.js","assets/MercadoPagoCheckout-Dw68aNER.css"])))=>i.map(i=>d[i]);
import { g as getDefaultExportFromCjs, b as getAugmentedNamespace, _, n as normalizeComponent, m as mixinsFilters, c as moment$1 } from "./mixins-CO2EmGtw.js";
import { m as mapMutations, a as mapState, i as index } from "./vuex.esm-BLukzcBM.js";
import { v as vSelect } from "./vue-select-Bq6QHwGa.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var vueGoogleMaps$1 = { exports: {} };
var fastDeepEqual;
var hasRequiredFastDeepEqual;
function requireFastDeepEqual() {
  if (hasRequiredFastDeepEqual) return fastDeepEqual;
  hasRequiredFastDeepEqual = 1;
  fastDeepEqual = function equal2(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor) return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; )
          if (!equal2(a[i], b[i])) return false;
        return true;
      }
      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal2(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  };
  return fastDeepEqual;
}
var fastDeepEqualExports = requireFastDeepEqual();
const equal = /* @__PURE__ */ getDefaultExportFromCjs(fastDeepEqualExports);
const ARRAY_TYPES = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
];
const VERSION = 1;
const HEADER_SIZE = 8;
class KDBush {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(data) {
    if (!(data instanceof ArrayBuffer)) {
      throw new Error("Data must be an instance of ArrayBuffer.");
    }
    const [magic, versionAndType] = new Uint8Array(data, 0, 2);
    if (magic !== 219) {
      throw new Error("Data does not appear to be in a KDBush format.");
    }
    const version = versionAndType >> 4;
    if (version !== VERSION) {
      throw new Error(`Got v${version} data when expected v${VERSION}.`);
    }
    const ArrayType = ARRAY_TYPES[versionAndType & 15];
    if (!ArrayType) {
      throw new Error("Unrecognized array type.");
    }
    const [nodeSize] = new Uint16Array(data, 2, 1);
    const [numItems] = new Uint32Array(data, 4, 1);
    return new KDBush(numItems, nodeSize, ArrayType, data);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(numItems, nodeSize = 64, ArrayType = Float64Array, data) {
    if (isNaN(numItems) || numItems < 0) throw new Error(`Unpexpected numItems value: ${numItems}.`);
    this.numItems = +numItems;
    this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
    this.ArrayType = ArrayType;
    this.IndexArrayType = numItems < 65536 ? Uint16Array : Uint32Array;
    const arrayTypeIndex = ARRAY_TYPES.indexOf(this.ArrayType);
    const coordsByteSize = numItems * 2 * this.ArrayType.BYTES_PER_ELEMENT;
    const idsByteSize = numItems * this.IndexArrayType.BYTES_PER_ELEMENT;
    const padCoords = (8 - idsByteSize % 8) % 8;
    if (arrayTypeIndex < 0) {
      throw new Error(`Unexpected typed array class: ${ArrayType}.`);
    }
    if (data && data instanceof ArrayBuffer) {
      this.data = data;
      this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
      this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
      this._pos = numItems * 2;
      this._finished = true;
    } else {
      this.data = new ArrayBuffer(HEADER_SIZE + coordsByteSize + idsByteSize + padCoords);
      this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
      this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
      this._pos = 0;
      this._finished = false;
      new Uint8Array(this.data, 0, 2).set([219, (VERSION << 4) + arrayTypeIndex]);
      new Uint16Array(this.data, 2, 1)[0] = nodeSize;
      new Uint32Array(this.data, 4, 1)[0] = numItems;
    }
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(x, y) {
    const index2 = this._pos >> 1;
    this.ids[index2] = index2;
    this.coords[this._pos++] = x;
    this.coords[this._pos++] = y;
    return index2;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    const numAdded = this._pos >> 1;
    if (numAdded !== this.numItems) {
      throw new Error(`Added ${numAdded} items when expected ${this.numItems}.`);
    }
    sort(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0);
    this._finished = true;
    return this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(minX, minY, maxX, maxY) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    const { ids, coords, nodeSize } = this;
    const stack = [0, ids.length - 1, 0];
    const result = [];
    while (stack.length) {
      const axis = stack.pop() || 0;
      const right = stack.pop() || 0;
      const left = stack.pop() || 0;
      if (right - left <= nodeSize) {
        for (let i = left; i <= right; i++) {
          const x2 = coords[2 * i];
          const y2 = coords[2 * i + 1];
          if (x2 >= minX && x2 <= maxX && y2 >= minY && y2 <= maxY) result.push(ids[i]);
        }
        continue;
      }
      const m = left + right >> 1;
      const x = coords[2 * m];
      const y = coords[2 * m + 1];
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
      if (axis === 0 ? minX <= x : minY <= y) {
        stack.push(left);
        stack.push(m - 1);
        stack.push(1 - axis);
      }
      if (axis === 0 ? maxX >= x : maxY >= y) {
        stack.push(m + 1);
        stack.push(right);
        stack.push(1 - axis);
      }
    }
    return result;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(qx, qy, r) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    const { ids, coords, nodeSize } = this;
    const stack = [0, ids.length - 1, 0];
    const result = [];
    const r2 = r * r;
    while (stack.length) {
      const axis = stack.pop() || 0;
      const right = stack.pop() || 0;
      const left = stack.pop() || 0;
      if (right - left <= nodeSize) {
        for (let i = left; i <= right; i++) {
          if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
        }
        continue;
      }
      const m = left + right >> 1;
      const x = coords[2 * m];
      const y = coords[2 * m + 1];
      if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
      if (axis === 0 ? qx - r <= x : qy - r <= y) {
        stack.push(left);
        stack.push(m - 1);
        stack.push(1 - axis);
      }
      if (axis === 0 ? qx + r >= x : qy + r >= y) {
        stack.push(m + 1);
        stack.push(right);
        stack.push(1 - axis);
      }
    }
    return result;
  }
}
function sort(ids, coords, nodeSize, left, right, axis) {
  if (right - left <= nodeSize) return;
  const m = left + right >> 1;
  select(ids, coords, m, left, right, axis);
  sort(ids, coords, nodeSize, left, m - 1, 1 - axis);
  sort(ids, coords, nodeSize, m + 1, right, 1 - axis);
}
function select(ids, coords, k, left, right, axis) {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      select(ids, coords, k, newLeft, newRight, axis);
    }
    const t = coords[2 * k + axis];
    let i = left;
    let j = right;
    swapItem(ids, coords, left, k);
    if (coords[2 * right + axis] > t) swapItem(ids, coords, left, right);
    while (i < j) {
      swapItem(ids, coords, i, j);
      i++;
      j--;
      while (coords[2 * i + axis] < t) i++;
      while (coords[2 * j + axis] > t) j--;
    }
    if (coords[2 * left + axis] === t) swapItem(ids, coords, left, j);
    else {
      j++;
      swapItem(ids, coords, j, right);
    }
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
}
function swapItem(ids, coords, i, j) {
  swap(ids, i, j);
  swap(coords, 2 * i, 2 * j);
  swap(coords, 2 * i + 1, 2 * j + 1);
}
function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
function sqDist(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}
const defaultOptions = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: false,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: false,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (props) => props
  // props => ({sum: props.my_value})
};
const fround = Math.fround || /* @__PURE__ */ ((tmp) => (x) => {
  tmp[0] = +x;
  return tmp[0];
})(new Float32Array(1));
const OFFSET_ZOOM = 2;
const OFFSET_ID = 3;
const OFFSET_PARENT = 4;
const OFFSET_NUM = 5;
const OFFSET_PROP = 6;
class Supercluster {
  constructor(options) {
    this.options = Object.assign(Object.create(defaultOptions), options);
    this.trees = new Array(this.options.maxZoom + 1);
    this.stride = this.options.reduce ? 7 : 6;
    this.clusterProps = [];
  }
  load(points) {
    const { log, minZoom, maxZoom } = this.options;
    if (log) console.time("total time");
    const timerId = `prepare ${points.length} points`;
    if (log) console.time(timerId);
    this.points = points;
    const data = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (!p.geometry) continue;
      const [lng, lat] = p.geometry.coordinates;
      const x = fround(lngX(lng));
      const y = fround(latY(lat));
      data.push(
        x,
        y,
        // projected point coordinates
        Infinity,
        // the last zoom the point was processed at
        i,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      );
      if (this.options.reduce) data.push(0);
    }
    let tree = this.trees[maxZoom + 1] = this._createTree(data);
    if (log) console.timeEnd(timerId);
    for (let z = maxZoom; z >= minZoom; z--) {
      const now = +Date.now();
      tree = this.trees[z] = this._createTree(this._cluster(tree, z));
      if (log) console.log("z%d: %d clusters in %dms", z, tree.numItems, +Date.now() - now);
    }
    if (log) console.timeEnd("total time");
    return this;
  }
  getClusters(bbox, zoom) {
    let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
    const minLat = Math.max(-90, Math.min(90, bbox[1]));
    let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
    const maxLat = Math.max(-90, Math.min(90, bbox[3]));
    if (bbox[2] - bbox[0] >= 360) {
      minLng = -180;
      maxLng = 180;
    } else if (minLng > maxLng) {
      const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
      const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
      return easternHem.concat(westernHem);
    }
    const tree = this.trees[this._limitZoom(zoom)];
    const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
    const data = tree.data;
    const clusters = [];
    for (const id of ids) {
      const k = this.stride * id;
      clusters.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
    }
    return clusters;
  }
  getChildren(clusterId) {
    const originId = this._getOriginId(clusterId);
    const originZoom = this._getOriginZoom(clusterId);
    const errorMsg = "No cluster with the specified id.";
    const tree = this.trees[originZoom];
    if (!tree) throw new Error(errorMsg);
    const data = tree.data;
    if (originId * this.stride >= data.length) throw new Error(errorMsg);
    const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
    const x = data[originId * this.stride];
    const y = data[originId * this.stride + 1];
    const ids = tree.within(x, y, r);
    const children = [];
    for (const id of ids) {
      const k = id * this.stride;
      if (data[k + OFFSET_PARENT] === clusterId) {
        children.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
      }
    }
    if (children.length === 0) throw new Error(errorMsg);
    return children;
  }
  getLeaves(clusterId, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;
    const leaves = [];
    this._appendLeaves(leaves, clusterId, limit, offset, 0);
    return leaves;
  }
  getTile(z, x, y) {
    const tree = this.trees[this._limitZoom(z)];
    const z2 = Math.pow(2, z);
    const { extent, radius } = this.options;
    const p = radius / extent;
    const top = (y - p) / z2;
    const bottom = (y + 1 + p) / z2;
    const tile = {
      features: []
    };
    this._addTileFeatures(
      tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
      tree.data,
      x,
      y,
      z2,
      tile
    );
    if (x === 0) {
      this._addTileFeatures(
        tree.range(1 - p / z2, top, 1, bottom),
        tree.data,
        z2,
        y,
        z2,
        tile
      );
    }
    if (x === z2 - 1) {
      this._addTileFeatures(
        tree.range(0, top, p / z2, bottom),
        tree.data,
        -1,
        y,
        z2,
        tile
      );
    }
    return tile.features.length ? tile : null;
  }
  getClusterExpansionZoom(clusterId) {
    let expansionZoom = this._getOriginZoom(clusterId) - 1;
    while (expansionZoom <= this.options.maxZoom) {
      const children = this.getChildren(clusterId);
      expansionZoom++;
      if (children.length !== 1) break;
      clusterId = children[0].properties.cluster_id;
    }
    return expansionZoom;
  }
  _appendLeaves(result, clusterId, limit, offset, skipped) {
    const children = this.getChildren(clusterId);
    for (const child of children) {
      const props = child.properties;
      if (props && props.cluster) {
        if (skipped + props.point_count <= offset) {
          skipped += props.point_count;
        } else {
          skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
        }
      } else if (skipped < offset) {
        skipped++;
      } else {
        result.push(child);
      }
      if (result.length === limit) break;
    }
    return skipped;
  }
  _createTree(data) {
    const tree = new KDBush(data.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let i = 0; i < data.length; i += this.stride) tree.add(data[i], data[i + 1]);
    tree.finish();
    tree.data = data;
    return tree;
  }
  _addTileFeatures(ids, data, x, y, z2, tile) {
    for (const i of ids) {
      const k = i * this.stride;
      const isCluster = data[k + OFFSET_NUM] > 1;
      let tags, px, py;
      if (isCluster) {
        tags = getClusterProperties(data, k, this.clusterProps);
        px = data[k];
        py = data[k + 1];
      } else {
        const p = this.points[data[k + OFFSET_ID]];
        tags = p.properties;
        const [lng, lat] = p.geometry.coordinates;
        px = lngX(lng);
        py = latY(lat);
      }
      const f = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (px * z2 - x)),
          Math.round(this.options.extent * (py * z2 - y))
        ]],
        tags
      };
      let id;
      if (isCluster || this.options.generateId) {
        id = data[k + OFFSET_ID];
      } else {
        id = this.points[data[k + OFFSET_ID]].id;
      }
      if (id !== void 0) f.id = id;
      tile.features.push(f);
    }
  }
  _limitZoom(z) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
  }
  _cluster(tree, zoom) {
    const { radius, extent, reduce, minPoints } = this.options;
    const r = radius / (extent * Math.pow(2, zoom));
    const data = tree.data;
    const nextData = [];
    const stride = this.stride;
    for (let i = 0; i < data.length; i += stride) {
      if (data[i + OFFSET_ZOOM] <= zoom) continue;
      data[i + OFFSET_ZOOM] = zoom;
      const x = data[i];
      const y = data[i + 1];
      const neighborIds = tree.within(data[i], data[i + 1], r);
      const numPointsOrigin = data[i + OFFSET_NUM];
      let numPoints = numPointsOrigin;
      for (const neighborId of neighborIds) {
        const k = neighborId * stride;
        if (data[k + OFFSET_ZOOM] > zoom) numPoints += data[k + OFFSET_NUM];
      }
      if (numPoints > numPointsOrigin && numPoints >= minPoints) {
        let wx = x * numPointsOrigin;
        let wy = y * numPointsOrigin;
        let clusterProperties;
        let clusterPropIndex = -1;
        const id = ((i / stride | 0) << 5) + (zoom + 1) + this.points.length;
        for (const neighborId of neighborIds) {
          const k = neighborId * stride;
          if (data[k + OFFSET_ZOOM] <= zoom) continue;
          data[k + OFFSET_ZOOM] = zoom;
          const numPoints2 = data[k + OFFSET_NUM];
          wx += data[k] * numPoints2;
          wy += data[k + 1] * numPoints2;
          data[k + OFFSET_PARENT] = id;
          if (reduce) {
            if (!clusterProperties) {
              clusterProperties = this._map(data, i, true);
              clusterPropIndex = this.clusterProps.length;
              this.clusterProps.push(clusterProperties);
            }
            reduce(clusterProperties, this._map(data, k));
          }
        }
        data[i + OFFSET_PARENT] = id;
        nextData.push(wx / numPoints, wy / numPoints, Infinity, id, -1, numPoints);
        if (reduce) nextData.push(clusterPropIndex);
      } else {
        for (let j = 0; j < stride; j++) nextData.push(data[i + j]);
        if (numPoints > 1) {
          for (const neighborId of neighborIds) {
            const k = neighborId * stride;
            if (data[k + OFFSET_ZOOM] <= zoom) continue;
            data[k + OFFSET_ZOOM] = zoom;
            for (let j = 0; j < stride; j++) nextData.push(data[k + j]);
          }
        }
      }
    }
    return nextData;
  }
  // get index of the point from which the cluster originated
  _getOriginId(clusterId) {
    return clusterId - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(clusterId) {
    return (clusterId - this.points.length) % 32;
  }
  _map(data, i, clone) {
    if (data[i + OFFSET_NUM] > 1) {
      const props = this.clusterProps[data[i + OFFSET_PROP]];
      return clone ? Object.assign({}, props) : props;
    }
    const original = this.points[data[i + OFFSET_ID]].properties;
    const result = this.options.map(original);
    return clone && result === original ? Object.assign({}, result) : result;
  }
}
function getClusterJSON(data, i, clusterProps) {
  return {
    type: "Feature",
    id: data[i + OFFSET_ID],
    properties: getClusterProperties(data, i, clusterProps),
    geometry: {
      type: "Point",
      coordinates: [xLng(data[i]), yLat(data[i + 1])]
    }
  };
}
function getClusterProperties(data, i, clusterProps) {
  const count = data[i + OFFSET_NUM];
  const abbrev = count >= 1e4 ? `${Math.round(count / 1e3)}k` : count >= 1e3 ? `${Math.round(count / 100) / 10}k` : count;
  const propIndex = data[i + OFFSET_PROP];
  const properties = propIndex === -1 ? {} : Object.assign({}, clusterProps[propIndex]);
  return Object.assign(properties, {
    cluster: true,
    cluster_id: data[i + OFFSET_ID],
    point_count: count,
    point_count_abbreviated: abbrev
  });
}
function lngX(lng) {
  return lng / 360 + 0.5;
}
function latY(lat) {
  const sin = Math.sin(lat * Math.PI / 180);
  const y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
  return y < 0 ? 0 : y > 1 ? 1 : y;
}
function xLng(x) {
  return (x - 0.5) * 360;
}
function yLat(y) {
  const y2 = (180 - y * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
class MarkerUtils {
  static isAdvancedMarkerAvailable(map) {
    return google.maps.marker && map.getMapCapabilities().isAdvancedMarkersAvailable === true;
  }
  static isAdvancedMarker(marker) {
    return google.maps.marker && marker instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(marker, map) {
    if (this.isAdvancedMarker(marker)) {
      marker.map = map;
    } else {
      marker.setMap(map);
    }
  }
  static getPosition(marker) {
    if (this.isAdvancedMarker(marker)) {
      if (marker.position) {
        if (marker.position instanceof google.maps.LatLng) {
          return marker.position;
        }
        if (marker.position.lat && marker.position.lng) {
          return new google.maps.LatLng(marker.position.lat, marker.position.lng);
        }
      }
      return new google.maps.LatLng(null);
    }
    return marker.getPosition();
  }
  static getVisible(marker) {
    if (this.isAdvancedMarker(marker)) {
      return true;
    }
    return marker.getVisible();
  }
}
class Cluster {
  constructor({ markers, position }) {
    this.markers = markers;
    if (position) {
      if (position instanceof google.maps.LatLng) {
        this._position = position;
      } else {
        this._position = new google.maps.LatLng(position);
      }
    }
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position) {
      return;
    }
    const bounds = new google.maps.LatLngBounds(this._position, this._position);
    for (const marker of this.markers) {
      bounds.extend(MarkerUtils.getPosition(marker));
    }
    return bounds;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((m) => MarkerUtils.getVisible(m)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(marker) {
    this.markers.push(marker);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    if (this.marker) {
      MarkerUtils.setMap(this.marker, null);
      this.marker = void 0;
    }
    this.markers.length = 0;
  }
}
const filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPaddingPixels) => {
  const extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPaddingPixels);
  return markers.filter((marker) => extendedMapBounds.contains(MarkerUtils.getPosition(marker)));
};
const extendBoundsToPaddedViewport = (bounds, projection, numPixels) => {
  const { northEast, southWest } = latLngBoundsToPixelBounds(bounds, projection);
  const extendedPixelBounds = extendPixelBounds({ northEast, southWest }, numPixels);
  return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
};
const getPaddedViewport = (bounds, projection, pixels) => {
  const extended = extendBoundsToPaddedViewport(bounds, projection, pixels);
  const ne = extended.getNorthEast();
  const sw = extended.getSouthWest();
  return [sw.lng(), sw.lat(), ne.lng(), ne.lat()];
};
const distanceBetweenPoints = (p1, p2) => {
  const R = 6371;
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLon = (p2.lng - p1.lng) * Math.PI / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const a = sinDLat * sinDLat + Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
const latLngBoundsToPixelBounds = (bounds, projection) => {
  return {
    northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
    southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest())
  };
};
const extendPixelBounds = ({ northEast, southWest }, numPixels) => {
  northEast.x += numPixels;
  northEast.y -= numPixels;
  southWest.x -= numPixels;
  southWest.y += numPixels;
  return { northEast, southWest };
};
const pixelBoundsToLatLngBounds = ({ northEast, southWest }, projection) => {
  const sw = projection.fromDivPixelToLatLng(southWest);
  const ne = projection.fromDivPixelToLatLng(northEast);
  return new google.maps.LatLngBounds(sw, ne);
};
class AbstractAlgorithm {
  constructor({ maxZoom = 16 }) {
    this.maxZoom = maxZoom;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop({ markers }) {
    return noop(markers);
  }
}
class AbstractViewportAlgorithm extends AbstractAlgorithm {
  constructor(_a) {
    var { viewportPadding = 60 } = _a, options = __rest(_a, ["viewportPadding"]);
    super(options);
    this.viewportPadding = 60;
    this.viewportPadding = viewportPadding;
  }
  calculate({ markers, map, mapCanvasProjection }) {
    if (map.getZoom() >= this.maxZoom) {
      return {
        clusters: this.noop({
          markers
        }),
        changed: false
      };
    }
    return {
      clusters: this.cluster({
        markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
        map,
        mapCanvasProjection
      })
    };
  }
}
const noop = (markers) => {
  const clusters = markers.map((marker) => new Cluster({
    position: MarkerUtils.getPosition(marker),
    markers: [marker]
  }));
  return clusters;
};
class GridAlgorithm extends AbstractViewportAlgorithm {
  constructor(_a) {
    var { maxDistance = 4e4, gridSize = 40 } = _a, options = __rest(_a, ["maxDistance", "gridSize"]);
    super(options);
    this.clusters = [];
    this.state = { zoom: -1 };
    this.maxDistance = maxDistance;
    this.gridSize = gridSize;
  }
  calculate({ markers, map, mapCanvasProjection }) {
    const state = { zoom: map.getZoom() };
    let changed = false;
    if (this.state.zoom >= this.maxZoom && state.zoom >= this.maxZoom) ;
    else {
      changed = !equal(this.state, state);
    }
    this.state = state;
    if (map.getZoom() >= this.maxZoom) {
      return {
        clusters: this.noop({
          markers
        }),
        changed
      };
    }
    return {
      clusters: this.cluster({
        markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
        map,
        mapCanvasProjection
      })
    };
  }
  cluster({ markers, map, mapCanvasProjection }) {
    this.clusters = [];
    markers.forEach((marker) => {
      this.addToClosestCluster(marker, map, mapCanvasProjection);
    });
    return this.clusters;
  }
  addToClosestCluster(marker, map, projection) {
    let maxDistance = this.maxDistance;
    let cluster = null;
    for (let i = 0; i < this.clusters.length; i++) {
      const candidate = this.clusters[i];
      const distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), MarkerUtils.getPosition(marker).toJSON());
      if (distance < maxDistance) {
        maxDistance = distance;
        cluster = candidate;
      }
    }
    if (cluster && extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(MarkerUtils.getPosition(marker))) {
      cluster.push(marker);
    } else {
      const cluster2 = new Cluster({ markers: [marker] });
      this.clusters.push(cluster2);
    }
  }
}
class NoopAlgorithm extends AbstractAlgorithm {
  constructor(_a) {
    var options = __rest(_a, []);
    super(options);
  }
  calculate({ markers, map, mapCanvasProjection }) {
    return {
      clusters: this.cluster({ markers, map, mapCanvasProjection }),
      changed: false
    };
  }
  cluster(input) {
    return this.noop(input);
  }
}
class SuperClusterAlgorithm extends AbstractAlgorithm {
  constructor(_a) {
    var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
    super({ maxZoom });
    this.state = { zoom: -1 };
    this.superCluster = new Supercluster(Object.assign({ maxZoom: this.maxZoom, radius }, options));
  }
  calculate(input) {
    let changed = false;
    const state = { zoom: input.map.getZoom() };
    if (!equal(input.markers, this.markers)) {
      changed = true;
      this.markers = [...input.markers];
      const points = this.markers.map((marker) => {
        const position = MarkerUtils.getPosition(marker);
        const coordinates = [position.lng(), position.lat()];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates
          },
          properties: { marker }
        };
      });
      this.superCluster.load(points);
    }
    if (!changed) {
      if (this.state.zoom <= this.maxZoom || state.zoom <= this.maxZoom) {
        changed = !equal(this.state, state);
      }
    }
    this.state = state;
    if (changed) {
      this.clusters = this.cluster(input);
    }
    return { clusters: this.clusters, changed };
  }
  cluster({ map }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(map.getZoom())).map((feature) => this.transformCluster(feature));
  }
  transformCluster({ geometry: { coordinates: [lng, lat] }, properties }) {
    if (properties.cluster) {
      return new Cluster({
        markers: this.superCluster.getLeaves(properties.cluster_id, Infinity).map((leaf) => leaf.properties.marker),
        position: { lat, lng }
      });
    }
    const marker = properties.marker;
    return new Cluster({
      markers: [marker],
      position: MarkerUtils.getPosition(marker)
    });
  }
}
class SuperClusterViewportAlgorithm extends AbstractViewportAlgorithm {
  constructor(_a) {
    var { maxZoom, radius = 60, viewportPadding = 60 } = _a, options = __rest(_a, ["maxZoom", "radius", "viewportPadding"]);
    super({ maxZoom, viewportPadding });
    this.superCluster = new Supercluster(Object.assign({ maxZoom: this.maxZoom, radius }, options));
    this.state = { zoom: -1, view: [0, 0, 0, 0] };
  }
  calculate(input) {
    const state = {
      zoom: Math.round(input.map.getZoom()),
      view: getPaddedViewport(input.map.getBounds(), input.mapCanvasProjection, this.viewportPadding)
    };
    let changed = !equal(this.state, state);
    if (!equal(input.markers, this.markers)) {
      changed = true;
      this.markers = [...input.markers];
      const points = this.markers.map((marker) => {
        const position = MarkerUtils.getPosition(marker);
        const coordinates = [position.lng(), position.lat()];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates
          },
          properties: { marker }
        };
      });
      this.superCluster.load(points);
    }
    if (changed) {
      this.clusters = this.cluster(input);
      this.state = state;
    }
    return { clusters: this.clusters, changed };
  }
  cluster({ map, mapCanvasProjection }) {
    const state = {
      zoom: Math.round(map.getZoom()),
      view: getPaddedViewport(map.getBounds(), mapCanvasProjection, this.viewportPadding)
    };
    return this.superCluster.getClusters(state.view, state.zoom).map((feature) => this.transformCluster(feature));
  }
  transformCluster({ geometry: { coordinates: [lng, lat] }, properties }) {
    if (properties.cluster) {
      return new Cluster({
        markers: this.superCluster.getLeaves(properties.cluster_id, Infinity).map((leaf) => leaf.properties.marker),
        position: { lat, lng }
      });
    }
    const marker = properties.marker;
    return new Cluster({
      markers: [marker],
      position: MarkerUtils.getPosition(marker)
    });
  }
}
class ClusterStats {
  constructor(markers, clusters) {
    this.markers = { sum: markers.length };
    const clusterMarkerCounts = clusters.map((a) => a.count);
    const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
    this.clusters = {
      count: clusters.length,
      markers: {
        mean: clusterMarkerSum / clusters.length,
        sum: clusterMarkerSum,
        min: Math.min(...clusterMarkerCounts),
        max: Math.max(...clusterMarkerCounts)
      }
    };
  }
}
class DefaultRenderer {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render({ count, position }, stats, map) {
    const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
    const svg = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${count}</text>
</svg>`;
    const title = `Cluster of ${count} markers`, zIndex = Number(google.maps.Marker.MAX_ZINDEX) + count;
    if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
      const parser = new DOMParser();
      const svgEl = parser.parseFromString(svg, "image/svg+xml").documentElement;
      svgEl.setAttribute("transform", "translate(0 25)");
      const clusterOptions2 = {
        map,
        position,
        zIndex,
        title,
        content: svgEl
      };
      return new google.maps.marker.AdvancedMarkerElement(clusterOptions2);
    }
    const clusterOptions = {
      position,
      zIndex,
      title,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(svg)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(clusterOptions);
  }
}
function extend(type1, type2) {
  for (let property in type2.prototype) {
    type1.prototype[property] = type2.prototype[property];
  }
}
class OverlayViewSafe {
  constructor() {
    extend(OverlayViewSafe, google.maps.OverlayView);
  }
}
var MarkerClustererEvents;
(function(MarkerClustererEvents2) {
  MarkerClustererEvents2["CLUSTERING_BEGIN"] = "clusteringbegin";
  MarkerClustererEvents2["CLUSTERING_END"] = "clusteringend";
  MarkerClustererEvents2["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
const defaultOnClusterClickHandler = (_2, cluster, map) => {
  map.fitBounds(cluster.bounds);
};
class MarkerClusterer extends OverlayViewSafe {
  constructor({ map, markers = [], algorithmOptions = {}, algorithm = new SuperClusterAlgorithm(algorithmOptions), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler }) {
    super();
    this.markers = [...markers];
    this.clusters = [];
    this.algorithm = algorithm;
    this.renderer = renderer;
    this.onClusterClick = onClusterClick;
    if (map) {
      this.setMap(map);
    }
  }
  addMarker(marker, noDraw) {
    if (this.markers.includes(marker)) {
      return;
    }
    this.markers.push(marker);
    if (!noDraw) {
      this.render();
    }
  }
  addMarkers(markers, noDraw) {
    markers.forEach((marker) => {
      this.addMarker(marker, true);
    });
    if (!noDraw) {
      this.render();
    }
  }
  removeMarker(marker, noDraw) {
    const index2 = this.markers.indexOf(marker);
    if (index2 === -1) {
      return false;
    }
    MarkerUtils.setMap(marker, null);
    this.markers.splice(index2, 1);
    if (!noDraw) {
      this.render();
    }
    return true;
  }
  removeMarkers(markers, noDraw) {
    let removed = false;
    markers.forEach((marker) => {
      removed = this.removeMarker(marker, true) || removed;
    });
    if (removed && !noDraw) {
      this.render();
    }
    return removed;
  }
  clearMarkers(noDraw) {
    this.markers.length = 0;
    if (!noDraw) {
      this.render();
    }
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    const map = this.getMap();
    if (map instanceof google.maps.Map && map.getProjection()) {
      google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
      const { clusters, changed } = this.algorithm.calculate({
        markers: this.markers,
        map,
        mapCanvasProjection: this.getProjection()
      });
      if (changed || changed == void 0) {
        const singleMarker = /* @__PURE__ */ new Set();
        for (const cluster of clusters) {
          if (cluster.markers.length == 1) {
            singleMarker.add(cluster.markers[0]);
          }
        }
        const groupMarkers = [];
        for (const cluster of this.clusters) {
          if (cluster.marker == null) {
            continue;
          }
          if (cluster.markers.length == 1) {
            if (!singleMarker.has(cluster.marker)) {
              MarkerUtils.setMap(cluster.marker, null);
            }
          } else {
            groupMarkers.push(cluster.marker);
          }
        }
        this.clusters = clusters;
        this.renderClusters();
        requestAnimationFrame(() => groupMarkers.forEach((marker) => MarkerUtils.setMap(marker, null)));
      }
      google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
    this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener);
    this.reset();
  }
  reset() {
    this.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
    this.clusters.forEach((cluster) => cluster.delete());
    this.clusters = [];
  }
  renderClusters() {
    const stats = new ClusterStats(this.markers, this.clusters);
    const map = this.getMap();
    this.clusters.forEach((cluster) => {
      if (cluster.markers.length === 1) {
        cluster.marker = cluster.markers[0];
      } else {
        cluster.marker = this.renderer.render(cluster, stats, map);
        cluster.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
        if (this.onClusterClick) {
          cluster.marker.addListener(
            "click",
            /* istanbul ignore next */
            (event) => {
              google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
              this.onClusterClick(event, cluster, map);
            }
          );
        }
      }
      MarkerUtils.setMap(cluster.marker, map);
    });
  }
}
const index_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbstractAlgorithm,
  AbstractViewportAlgorithm,
  Cluster,
  ClusterStats,
  DefaultRenderer,
  GridAlgorithm,
  MarkerClusterer,
  get MarkerClustererEvents() {
    return MarkerClustererEvents;
  },
  MarkerUtils,
  NoopAlgorithm,
  SuperClusterAlgorithm,
  SuperClusterViewportAlgorithm,
  defaultOnClusterClickHandler,
  distanceBetweenPoints,
  extendBoundsToPaddedViewport,
  extendPixelBounds,
  filterMarkersToPaddedViewport,
  getPaddedViewport,
  noop,
  pixelBoundsToLatLngBounds
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(index_esm);
var hasRequiredVueGoogleMaps;
function requireVueGoogleMaps() {
  if (hasRequiredVueGoogleMaps) return vueGoogleMaps$1.exports;
  hasRequiredVueGoogleMaps = 1;
  (function(module, exports) {
    !function(e, t) {
      module.exports = t(require$$0);
    }(window, function(e) {
      return function(e2) {
        var t = {};
        function n(r) {
          if (t[r]) return t[r].exports;
          var o = t[r] = { i: r, l: false, exports: {} };
          return e2[r].call(o.exports, o, o.exports, n), o.l = true, o.exports;
        }
        return n.m = e2, n.c = t, n.d = function(e3, t2, r) {
          n.o(e3, t2) || Object.defineProperty(e3, t2, { configurable: false, enumerable: true, get: r });
        }, n.r = function(e3) {
          Object.defineProperty(e3, "__esModule", { value: true });
        }, n.n = function(e3) {
          var t2 = e3 && e3.__esModule ? function() {
            return e3.default;
          } : function() {
            return e3;
          };
          return n.d(t2, "a", t2), t2;
        }, n.o = function(e3, t2) {
          return Object.prototype.hasOwnProperty.call(e3, t2);
        }, n.p = "", n(n.s = 44);
      }([function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r = /* @__PURE__ */ function() {
          return function(e3, t2) {
            if (Array.isArray(e3)) return e3;
            if (Symbol.iterator in Object(e3)) return function(e4, t3) {
              var n2 = [], r2 = true, o2 = false, a2 = void 0;
              try {
                for (var i2, u2 = e4[Symbol.iterator](); !(r2 = (i2 = u2.next()).done) && (n2.push(i2.value), !t3 || n2.length !== t3); r2 = true) ;
              } catch (e5) {
                o2 = true, a2 = e5;
              } finally {
                try {
                  !r2 && u2.return && u2.return();
                } finally {
                  if (o2) throw a2;
                }
              }
              return n2;
            }(e3, t2);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), o = Object.assign || function(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e3[r2] = n2[r2]);
          }
          return e3;
        };
        t.default = function(e3) {
          var t2 = e3.mappedProps, n2 = e3.name, r2 = e3.ctr, s2 = e3.ctrArgs, l = e3.events, p = e3.beforeCreate, d = e3.afterCreate, f = e3.props, m = function(e4, t3) {
            var n3 = {};
            for (var r3 in e4) t3.indexOf(r3) >= 0 || Object.prototype.hasOwnProperty.call(e4, r3) && (n3[r3] = e4[r3]);
            return n3;
          }(e3, ["mappedProps", "name", "ctr", "ctrArgs", "events", "beforeCreate", "afterCreate", "props"]), h = "$" + n2 + "Promise", v = "$" + n2 + "Object";
          return function(e4, t3) {
            if (!e4) throw new Error(t3);
          }(!(m.props instanceof Array), "`props` should be an object, not Array"), o({}, "undefined" != typeof GENERATE_DOC ? { $vgmOptions: e3 } : {}, { mixins: [u.default], props: o({}, f, c(t2)), render: function() {
            return "";
          }, provide: function() {
            var e4 = this, n3 = this.$mapPromise.then(function(n4) {
              e4.$map = n4;
              var r3 = o({}, e4.options, { map: n4 }, (0, i.getPropsValues)(e4, t2));
              if (delete r3.options, p) {
                var a2 = p.bind(e4)(r3);
                if (a2 instanceof Promise) return a2.then(function() {
                  return { options: r3 };
                });
              }
              return { options: r3 };
            }).then(function(n4) {
              var o2, u2 = n4.options, c2 = r2();
              return e4[v] = s2 ? new ((o2 = Function.prototype.bind).call.apply(o2, [c2, null].concat(function(e5) {
                if (Array.isArray(e5)) {
                  for (var t3 = 0, n5 = Array(e5.length); t3 < e5.length; t3++) n5[t3] = e5[t3];
                  return n5;
                }
                return Array.from(e5);
              }(s2(u2, (0, i.getPropsValues)(e4, f || {}))))))() : new c2(u2), (0, i.bindProps)(e4, e4[v], t2), (0, a.default)(e4, e4[v], l), d && d.bind(e4)(e4[v]), e4[v];
            });
            return this[h] = n3, function(e5, t3, n4) {
              t3 in e5 ? Object.defineProperty(e5, t3, { value: n4, enumerable: true, configurable: true, writable: true }) : e5[t3] = n4;
              return e5;
            }({}, h, n3);
          }, destroyed: function() {
            this[v] && this[v].setMap && this[v].setMap(null);
          } }, m);
        }, t.mappedPropsToVueProps = c;
        var a = s(n(10)), i = n(2), u = s(n(20));
        function s(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        function c(e3) {
          return Object.entries(e3).map(function(e4) {
            var t2 = r(e4, 2), n2 = t2[0], o2 = t2[1], a2 = {};
            return "type" in o2 && (a2.type = o2.type), "default" in o2 && (a2.default = o2.default), "required" in o2 && (a2.required = o2.required), [n2, a2];
          }).reduce(function(e4, t2) {
            var n2 = r(t2, 2), o2 = n2[0], a2 = n2[1];
            return e4[o2] = a2, e4;
          }, {});
        }
      }, function(e2, t, n) {
        function r(e3, t2, n2, r2, o, a, i, u) {
          var s = typeof (e3 = e3 || {}).default;
          "object" !== s && "function" !== s || (e3 = e3.default);
          var c, l = "function" == typeof e3 ? e3.options : e3;
          if (t2 && (l.render = t2, l.staticRenderFns = n2, l._compiled = true), r2 && (l.functional = true), a && (l._scopeId = a), i ? (c = function(e4) {
            (e4 = e4 || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e4 = __VUE_SSR_CONTEXT__), o && o.call(this, e4), e4 && e4._registeredComponents && e4._registeredComponents.add(i);
          }, l._ssrRegister = c) : o && (c = u ? function() {
            o.call(this, this.$root.$options.shadowRoot);
          } : o), c) if (l.functional) {
            l._injectStyles = c;
            var p = l.render;
            l.render = function(e4, t3) {
              return c.call(t3), p(e4, t3);
            };
          } else {
            var d = l.beforeCreate;
            l.beforeCreate = d ? [].concat(d, c) : [c];
          }
          return { exports: e3, options: l };
        }
        n.d(t, "a", function() {
          return r;
        });
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.getPropsValues = function(e3, t2) {
          return Object.keys(t2).reduce(function(t3, n2) {
            return void 0 !== e3[n2] && (t3[n2] = e3[n2]), t3;
          }, {});
        }, t.bindProps = function(e3, t2, n2) {
          var r2 = function(r3) {
            var o3 = n2[r3], u = o3.twoWay, s = o3.type, c = o3.trackProperties, l = o3.noBind;
            if (l) return "continue";
            var p = "set" + i(r3), d = "get" + i(r3), f = r3.toLowerCase() + "_changed", m = e3[r3];
            if (void 0 === t2[p]) throw new Error(p + " is not a method of (the Maps object corresponding to) " + e3.$options._componentTag);
            s === Object && c ? (0, a.default)(e3, c.map(function(e4) {
              return r3 + "." + e4;
            }), function() {
              t2[p](e3[r3]);
            }, void 0 !== e3[r3]) : e3.$watch(r3, function() {
              var n3 = e3[r3];
              t2[p](n3);
            }, { immediate: void 0 !== m, deep: s === Object }), u && (e3.$gmapOptions.autobindAllEvents || e3.$listeners[f]) && t2.addListener(f, function() {
              e3.$emit(f, t2[d]());
            });
          };
          for (var o2 in n2) r2(o2);
        };
        var r, o = n(9), a = (r = o) && r.__esModule ? r : { default: r };
        function i(e3) {
          return e3.charAt(0).toUpperCase() + e3.slice(1);
        }
      }, function(e2, t, n) {
        var r;
        Object.defineProperty(t, "__esModule", { value: true }), t.default = (r = n(23)).default || r;
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r, o = n(2), a = n(17), i = (r = a) && r.__esModule ? r : { default: r };
        var u = { bounds: { type: Object }, defaultPlace: { type: String, default: "" }, componentRestrictions: { type: Object, default: null }, types: { type: Array, default: function() {
          return [];
        } }, placeholder: { required: false, type: String }, className: { required: false, type: String }, label: { required: false, type: String, default: null }, selectFirstOnEnter: { require: false, type: Boolean, default: false } };
        t.default = { mounted: function() {
          var e3 = this, t2 = this.$refs.input;
          t2.value = this.defaultPlace, this.$watch("defaultPlace", function() {
            t2.value = e3.defaultPlace;
          }), this.$gmapApiPromiseLazy().then(function() {
            var t3 = (0, o.getPropsValues)(e3, u);
            if (e3.selectFirstOnEnter && (0, i.default)(e3.$refs.input), "function" != typeof google.maps.places.Autocomplete) throw new Error("google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?");
            e3.autoCompleter = new google.maps.places.Autocomplete(e3.$refs.input, t3);
            var n2 = function(e4, t4) {
              var n3 = {};
              for (var r2 in e4) t4.indexOf(r2) >= 0 || Object.prototype.hasOwnProperty.call(e4, r2) && (n3[r2] = e4[r2]);
              return n3;
            }(u, ["placeholder", "place", "defaultPlace", "className", "label", "selectFirstOnEnter"]);
            (0, o.bindProps)(e3, e3.autoCompleter, n2), e3.autoCompleter.addListener("place_changed", function() {
              e3.$emit("place_changed", e3.autoCompleter.getPlace());
            });
          });
        }, created: function() {
          console.warn("The PlaceInput class is deprecated! Please consider using the Autocomplete input instead");
        }, props: u };
      }, function(e2, t, n) {
        var r;
        Object.defineProperty(t, "__esModule", { value: true }), t.default = (r = n(26)).default || r;
      }, function(e2, t, n) {
        var r;
        Object.defineProperty(t, "__esModule", { value: true }), t.default = (r = n(30)).default || r;
      }, function(e2, t, n) {
        var r;
        Object.defineProperty(t, "__esModule", { value: true }), t.default = (r = n(34)).default || r;
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = { props: ["resizeBus"], data: function() {
          return { _actualResizeBus: null };
        }, created: function() {
          void 0 === this.resizeBus ? this.$data._actualResizeBus = this.$gmapDefaultResizeBus : this.$data._actualResizeBus = this.resizeBus;
        }, methods: { _resizeCallback: function() {
          this.resize();
        }, _delayedResizeCallback: function() {
          var e3 = this;
          this.$nextTick(function() {
            return e3._resizeCallback();
          });
        } }, watch: { resizeBus: function(e3) {
          this.$data._actualResizeBus = e3;
        }, "$data._actualResizeBus": function(e3, t2) {
          t2 && t2.$off("resize", this._delayedResizeCallback), e3 && e3.$on("resize", this._delayedResizeCallback);
        } }, destroyed: function() {
          this.$data._actualResizeBus && this.$data._actualResizeBus.$off("resize", this._delayedResizeCallback);
        } };
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e3, t2, n2) {
          var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o = false;
          function a() {
            o || (o = true, e3.$nextTick(function() {
              o = false, n2();
            }));
          }
          var i = true, u = false, s = void 0;
          try {
            for (var c, l = t2[Symbol.iterator](); !(i = (c = l.next()).done); i = true) {
              var p = c.value;
              e3.$watch(p, a, { immediate: r });
            }
          } catch (e4) {
            u = true, s = e4;
          } finally {
            try {
              !i && l.return && l.return();
            } finally {
              if (u) throw s;
            }
          }
        };
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e3, t2, n2) {
          var r = function(n3) {
            (e3.$gmapOptions.autobindAllEvents || e3.$listeners[n3]) && t2.addListener(n3, function(t3) {
              e3.$emit(n3, t3);
            });
          }, o = true, a = false, i = void 0;
          try {
            for (var u, s = n2[Symbol.iterator](); !(o = (u = s.next()).done); o = true) {
              r(u.value);
            }
          } catch (e4) {
            a = true, i = e4;
          } finally {
            try {
              !o && s.return && s.return();
            } finally {
              if (a) throw i;
            }
          }
        };
      }, function(e2, t, n) {
        n.d(t, "a", function() {
          return r;
        }), n.d(t, "b", function() {
          return o;
        });
        var r = function() {
          var e3 = this.$createElement;
          return (this._self._c || e3)("input", this._g(this._b({ ref: "input" }, "input", this.$attrs, false), this.$listeners));
        }, o = [];
      }, function(e2, t, n) {
        n.d(t, "a", function() {
          return r;
        }), n.d(t, "b", function() {
          return o;
        });
        var r = function() {
          var e3 = this.$createElement, t2 = this._self._c || e3;
          return t2("label", [t2("span", { domProps: { textContent: this._s(this.label) } }), this._v(" "), t2("input", { ref: "input", class: this.className, attrs: { type: "text", placeholder: this.placeholder } })]);
        }, o = [];
      }, function(e2, t, n) {
        n.d(t, "a", function() {
          return r;
        }), n.d(t, "b", function() {
          return o;
        });
        var r = function() {
          var e3 = this.$createElement, t2 = this._self._c || e3;
          return t2("div", { staticClass: "vue-street-view-pano-container" }, [t2("div", { ref: "vue-street-view-pano", staticClass: "vue-street-view-pano" }), this._v(" "), this._t("default")], 2);
        }, o = [];
      }, function(e2, t, n) {
        n.d(t, "a", function() {
          return r;
        }), n.d(t, "b", function() {
          return o;
        });
        var r = function() {
          var e3 = this.$createElement, t2 = this._self._c || e3;
          return t2("div", { staticClass: "vue-map-container" }, [t2("div", { ref: "vue-map", staticClass: "vue-map" }), this._v(" "), t2("div", { staticClass: "vue-map-hidden" }, [this._t("default")], 2), this._v(" "), this._t("visible")], 2);
        }, o = [];
      }, function(e2, t, n) {
        n.d(t, "a", function() {
          return r;
        }), n.d(t, "b", function() {
          return o;
        });
        var r = function() {
          var e3 = this.$createElement, t2 = this._self._c || e3;
          return t2("div", [t2("div", { ref: "flyaway" }, [this._t("default")], 2)]);
        }, o = [];
      }, function(e2, t, n) {
        function r(e3, t2) {
          for (var n2 = [], r2 = {}, o2 = 0; o2 < t2.length; o2++) {
            var a2 = t2[o2], i2 = a2[0], u2 = { id: e3 + ":" + o2, css: a2[1], media: a2[2], sourceMap: a2[3] };
            r2[i2] ? r2[i2].parts.push(u2) : n2.push(r2[i2] = { id: i2, parts: [u2] });
          }
          return n2;
        }
        n.r(t), n.d(t, "default", function() {
          return m;
        });
        var o = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !o) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var a = {}, i = o && (document.head || document.getElementsByTagName("head")[0]), u = null, s = 0, c = false, l = function() {
        }, p = null, d = "data-vue-ssr-id", f = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        function m(e3, t2, n2, o2) {
          c = n2, p = o2 || {};
          var i2 = r(e3, t2);
          return h(i2), function(t3) {
            for (var n3 = [], o3 = 0; o3 < i2.length; o3++) {
              var u2 = i2[o3];
              (s2 = a[u2.id]).refs--, n3.push(s2);
            }
            t3 ? h(i2 = r(e3, t3)) : i2 = [];
            for (o3 = 0; o3 < n3.length; o3++) {
              var s2;
              if (0 === (s2 = n3[o3]).refs) {
                for (var c2 = 0; c2 < s2.parts.length; c2++) s2.parts[c2]();
                delete a[s2.id];
              }
            }
          };
        }
        function h(e3) {
          for (var t2 = 0; t2 < e3.length; t2++) {
            var n2 = e3[t2], r2 = a[n2.id];
            if (r2) {
              r2.refs++;
              for (var o2 = 0; o2 < r2.parts.length; o2++) r2.parts[o2](n2.parts[o2]);
              for (; o2 < n2.parts.length; o2++) r2.parts.push(y(n2.parts[o2]));
              r2.parts.length > n2.parts.length && (r2.parts.length = n2.parts.length);
            } else {
              var i2 = [];
              for (o2 = 0; o2 < n2.parts.length; o2++) i2.push(y(n2.parts[o2]));
              a[n2.id] = { id: n2.id, refs: 1, parts: i2 };
            }
          }
        }
        function v() {
          var e3 = document.createElement("style");
          return e3.type = "text/css", i.appendChild(e3), e3;
        }
        function y(e3) {
          var t2, n2, r2 = document.querySelector("style[" + d + '~="' + e3.id + '"]');
          if (r2) {
            if (c) return l;
            r2.parentNode.removeChild(r2);
          }
          if (f) {
            var o2 = s++;
            r2 = u || (u = v()), t2 = _2.bind(null, r2, o2, false), n2 = _2.bind(null, r2, o2, true);
          } else r2 = v(), t2 = (function(e4, t3) {
            var n3 = t3.css, r3 = t3.media, o3 = t3.sourceMap;
            r3 && e4.setAttribute("media", r3);
            p.ssrId && e4.setAttribute(d, t3.id);
            o3 && (n3 += "\n/*# sourceURL=" + o3.sources[0] + " */", n3 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o3)))) + " */");
            if (e4.styleSheet) e4.styleSheet.cssText = n3;
            else {
              for (; e4.firstChild; ) e4.removeChild(e4.firstChild);
              e4.appendChild(document.createTextNode(n3));
            }
          }).bind(null, r2), n2 = function() {
            r2.parentNode.removeChild(r2);
          };
          return t2(e3), function(r3) {
            if (r3) {
              if (r3.css === e3.css && r3.media === e3.media && r3.sourceMap === e3.sourceMap) return;
              t2(e3 = r3);
            } else n2();
          };
        }
        var b, g = (b = [], function(e3, t2) {
          return b[e3] = t2, b.filter(Boolean).join("\n");
        });
        function _2(e3, t2, n2, r2) {
          var o2 = n2 ? "" : r2.css;
          if (e3.styleSheet) e3.styleSheet.cssText = g(t2, o2);
          else {
            var a2 = document.createTextNode(o2), i2 = e3.childNodes;
            i2[t2] && e3.removeChild(i2[t2]), i2.length ? e3.insertBefore(a2, i2[t2]) : e3.appendChild(a2);
          }
        }
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e3) {
          var t2 = e3.addEventListener ? e3.addEventListener : e3.attachEvent;
          function n2(n3, r) {
            if ("keydown" === n3) {
              var o = r;
              r = function(t3) {
                var n4 = document.getElementsByClassName("pac-item-selected").length > 0;
                if (13 === t3.which && !n4) {
                  var r2 = document.createEvent("Event");
                  r2.keyCode = 40, r2.which = 40, o.apply(e3, [r2]);
                }
                o.apply(e3, [t3]);
              };
            }
            t2.apply(e3, [n3, r]);
          }
          e3.addEventListener = n2, e3.attachEvent = n2;
        };
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e3) {
          var t2 = 0;
          e3(function() {
            t2 += 1;
          }, function() {
            t2 = Math.max(0, t2 - 1);
          }, function() {
            return 0 === t2;
          });
        };
      }, function(e2, t) {
        e2.exports = function() {
          var e3 = [];
          return e3.toString = function() {
            for (var e4 = [], t2 = 0; t2 < this.length; t2++) {
              var n = this[t2];
              n[2] ? e4.push("@media " + n[2] + "{" + n[1] + "}") : e4.push(n[1]);
            }
            return e4.join("");
          }, e3.i = function(t2, n) {
            "string" == typeof t2 && (t2 = [[null, t2, ""]]);
            for (var r = {}, o = 0; o < this.length; o++) {
              var a = this[o][0];
              "number" == typeof a && (r[a] = true);
            }
            for (o = 0; o < t2.length; o++) {
              var i = t2[o];
              "number" == typeof i[0] && r[i[0]] || (n && !i[2] ? i[2] = n : n && (i[2] = "(" + i[2] + ") and (" + n + ")"), e3.push(i));
            }
          }, e3;
        };
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = { inject: { $mapPromise: { default: "abcdef" } }, provide: function() {
          var e3 = this;
          return this.$mapPromise.then(function(t2) {
            e3.$map = t2;
          }), {};
        } };
      }, function(t, n) {
        t.exports = e;
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r = a(n(21)), o = a(n(0));
        function a(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        var i = { maxZoom: { type: Number, twoWay: false }, batchSizeIE: { type: Number, twoWay: false }, calculator: { type: Function, twoWay: false }, enableRetinaIcons: { type: Boolean, twoWay: false }, gridSize: { type: Number, twoWay: false }, ignoreHidden: { type: Boolean, twoWay: false }, imageExtension: { type: String, twoWay: false }, imagePath: { type: String, twoWay: false }, imageSizes: { type: Array, twoWay: false }, minimumClusterSize: { type: Number, twoWay: false }, styles: { type: Array, twoWay: false }, zoomOnClick: { type: Boolean, twoWay: false } };
        t.default = (0, o.default)({ mappedProps: i, events: ["click", "rightclick", "dblclick", "drag", "dragstart", "dragend", "mouseup", "mousedown", "mouseover", "mouseout"], name: "cluster", ctr: function() {
          if (void 0 === r.default) throw console.error("MarkerClusterer is not installed! require() it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js"), new Error("MarkerClusterer is not installed! require() it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js");
          return r.default;
        }, ctrArgs: function(e3) {
          return [e3.map, [], function(e4, t2) {
            var n2 = {};
            for (var r2 in e4) t2.indexOf(r2) >= 0 || Object.prototype.hasOwnProperty.call(e4, r2) && (n2[r2] = e4[r2]);
            return n2;
          }(e3, ["map"])];
        }, render: function(e3) {
          return e3("div", this.$slots.default);
        }, afterCreate: function(e3) {
          var t2 = function() {
            var t3 = e3.getMarkers();
            e3.clearMarkers(), e3.addMarkers(t3);
          };
          for (var n2 in i) i[n2].twoWay && this.$on(n2.toLowerCase() + "_changed", t2);
        }, updated: function() {
          this.$clusterObject && this.$clusterObject.repaint();
        }, beforeDestroy: function() {
          var e3 = this;
          this.$children.forEach(function(t2) {
            t2.$clusterObject === e3.$clusterObject && (t2.$clusterObject = null);
          }), this.$clusterObject && this.$clusterObject.clearMarkers();
        } });
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r, o = Object.assign || function(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e3[r2] = n2[r2]);
          }
          return e3;
        }, a = n(2), i = n(17), u = (r = i) && r.__esModule ? r : { default: r }, s = n(0);
        var c = { bounds: { type: Object }, componentRestrictions: { type: Object, noBind: true }, types: { type: Array, default: function() {
          return [];
        } } }, l = { selectFirstOnEnter: { required: false, type: Boolean, default: false }, options: { type: Object } };
        t.default = { mounted: function() {
          var e3 = this;
          this.$gmapApiPromiseLazy().then(function() {
            if (e3.selectFirstOnEnter && (0, u.default)(e3.$refs.input), "function" != typeof google.maps.places.Autocomplete) throw new Error("google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?");
            var t2 = o({}, (0, a.getPropsValues)(e3, c), e3.options);
            e3.$autocomplete = new google.maps.places.Autocomplete(e3.$refs.input, t2), (0, a.bindProps)(e3, e3.$autocomplete, c), e3.$watch("componentRestrictions", function(t3) {
              void 0 !== t3 && e3.$autocomplete.setComponentRestrictions(t3);
            }), e3.$autocomplete.addListener("place_changed", function() {
              e3.$emit("place_changed", e3.$autocomplete.getPlace());
            });
          });
        }, props: o({}, (0, s.mappedPropsToVueProps)(c), l) };
      }, function(e2, t, n) {
        n.r(t);
        var r = n(3), o = n.n(r);
        for (var a in r) "default" !== a && function(e3) {
          n.d(t, e3, function() {
            return r[e3];
          });
        }(a);
        var i = n(11), u = n(1), s = Object(u.a)(o.a, i.a, i.b, false, null, null, null);
        t.default = s.exports;
      }, function(e2, t, n) {
        n.r(t);
        var r = n(4), o = n.n(r);
        for (var a in r) "default" !== a && function(e3) {
          n.d(t, e3, function() {
            return r[e3];
          });
        }(a);
        var i = n(12), u = n(1), s = Object(u.a)(o.a, i.a, i.b, false, null, null, null);
        t.default = s.exports;
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r = Object.assign || function(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e3[r2] = n2[r2]);
          }
          return e3;
        }, o = l(n(10)), a = n(2), i = l(n(8)), u = l(n(18)), s = l(n(9)), c = n(0);
        function l(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        var p = { zoom: { twoWay: true, type: Number }, pov: { twoWay: true, type: Object, trackProperties: ["pitch", "heading"] }, position: { twoWay: true, type: Object, noBind: true }, pano: { twoWay: true, type: String }, motionTracking: { twoWay: false, type: Boolean }, visible: { twoWay: true, type: Boolean, default: true }, options: { twoWay: false, type: Object, default: function() {
          return {};
        } } }, d = ["closeclick", "status_changed"];
        t.default = { mixins: [i.default], props: (0, c.mappedPropsToVueProps)(p), replace: false, methods: { resize: function() {
          this.$panoObject && google.maps.event.trigger(this.$panoObject, "resize");
        } }, provide: function() {
          var e3 = this, t2 = new Promise(function(t3, n2) {
            e3.$panoPromiseDeferred = { resolve: t3, reject: n2 };
          });
          return { $panoPromise: t2, $mapPromise: t2 };
        }, computed: { finalLat: function() {
          return this.position && "function" == typeof this.position.lat ? this.position.lat() : this.position.lat;
        }, finalLng: function() {
          return this.position && "function" == typeof this.position.lng ? this.position.lng() : this.position.lng;
        }, finalLatLng: function() {
          return { lat: this.finalLat, lng: this.finalLng };
        } }, watch: { zoom: function(e3) {
          this.$panoObject && this.$panoObject.setZoom(e3);
        } }, mounted: function() {
          var e3 = this;
          return this.$gmapApiPromiseLazy().then(function() {
            var t2 = e3.$refs["vue-street-view-pano"], n2 = r({}, e3.options, (0, a.getPropsValues)(e3, p));
            return delete n2.options, e3.$panoObject = new google.maps.StreetViewPanorama(t2, n2), (0, a.bindProps)(e3, e3.$panoObject, p), (0, o.default)(e3, e3.$panoObject, d), (0, u.default)(function(t3, n3, r2) {
              t3(), e3.$panoObject.addListener("position_changed", function() {
                r2() && e3.$emit("position_changed", e3.$panoObject.getPosition()), n3();
              }), (0, s.default)(e3, ["finalLat", "finalLng"], function() {
                t3(), e3.$panoObject.setPosition(e3.finalLatLng);
              });
            }), e3.$panoPromiseDeferred.resolve(e3.$panoObject), e3.$panoPromise;
          }).catch(function(e4) {
            throw e4;
          });
        } };
      }, function(e2, t, n) {
        (e2.exports = n(19)()).push([e2.i, ".vue-street-view-pano-container{position:relative}.vue-street-view-pano-container .vue-street-view-pano{left:0;right:0;top:0;bottom:0;position:absolute}", ""]);
      }, function(e2, t, n) {
        var r = n(27);
        "string" == typeof r && (r = [[e2.i, r, ""]]), r.locals && (e2.exports = r.locals);
        (0, n(16).default)("31fa8950", r, true, {});
      }, function(e2, t, n) {
        n.r(t);
        var r = n(5), o = n.n(r);
        for (var a in r) "default" !== a && function(e3) {
          n.d(t, e3, function() {
            return r[e3];
          });
        }(a);
        var i = n(13), u = n(1);
        var s = function(e3) {
          n(28);
        }, c = Object(u.a)(o.a, i.a, i.b, false, s, null, null);
        t.default = c.exports;
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r = Object.assign || function(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e3[r2] = n2[r2]);
          }
          return e3;
        }, o = l(n(10)), a = n(2), i = l(n(8)), u = l(n(18)), s = l(n(9)), c = n(0);
        function l(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        var p = { center: { required: true, twoWay: true, type: Object, noBind: true }, zoom: { required: false, twoWay: true, type: Number, noBind: true }, heading: { type: Number, twoWay: true }, mapTypeId: { twoWay: true, type: String }, tilt: { twoWay: true, type: Number }, options: { type: Object, default: function() {
          return {};
        } } }, d = ["bounds_changed", "click", "dblclick", "drag", "dragend", "dragstart", "idle", "mousemove", "mouseout", "mouseover", "resize", "rightclick", "tilesloaded"], f = ["panBy", "panTo", "panToBounds", "fitBounds"].reduce(function(e3, t2) {
          return e3[t2] = function() {
            this.$mapObject && this.$mapObject[t2].apply(this.$mapObject, arguments);
          }, e3;
        }, {}), m = { resize: function() {
          this.$mapObject && google.maps.event.trigger(this.$mapObject, "resize");
        }, resizePreserveCenter: function() {
          if (this.$mapObject) {
            var e3 = this.$mapObject.getCenter();
            google.maps.event.trigger(this.$mapObject, "resize"), this.$mapObject.setCenter(e3);
          }
        }, _resizeCallback: function() {
          this.resizePreserveCenter();
        } };
        t.default = { mixins: [i.default], props: (0, c.mappedPropsToVueProps)(p), provide: function() {
          var e3 = this;
          return this.$mapPromise = new Promise(function(t2, n2) {
            e3.$mapPromiseDeferred = { resolve: t2, reject: n2 };
          }), { $mapPromise: this.$mapPromise };
        }, computed: { finalLat: function() {
          return this.center && "function" == typeof this.center.lat ? this.center.lat() : this.center.lat;
        }, finalLng: function() {
          return this.center && "function" == typeof this.center.lng ? this.center.lng() : this.center.lng;
        }, finalLatLng: function() {
          return { lat: this.finalLat, lng: this.finalLng };
        } }, watch: { zoom: function(e3) {
          this.$mapObject && this.$mapObject.setZoom(e3);
        } }, mounted: function() {
          var e3 = this;
          return this.$gmapApiPromiseLazy().then(function() {
            var t2 = e3.$refs["vue-map"], n2 = r({}, e3.options, (0, a.getPropsValues)(e3, p));
            return delete n2.options, e3.$mapObject = new google.maps.Map(t2, n2), (0, a.bindProps)(e3, e3.$mapObject, p), (0, o.default)(e3, e3.$mapObject, d), (0, u.default)(function(t3, n3, r2) {
              e3.$mapObject.addListener("center_changed", function() {
                r2() && e3.$emit("center_changed", e3.$mapObject.getCenter()), n3();
              }), (0, s.default)(e3, ["finalLat", "finalLng"], function() {
                t3(), e3.$mapObject.setCenter(e3.finalLatLng);
              });
            }), e3.$mapObject.addListener("zoom_changed", function() {
              e3.$emit("zoom_changed", e3.$mapObject.getZoom());
            }), e3.$mapObject.addListener("bounds_changed", function() {
              e3.$emit("bounds_changed", e3.$mapObject.getBounds());
            }), e3.$mapPromiseDeferred.resolve(e3.$mapObject), e3.$mapObject;
          }).catch(function(e4) {
            throw e4;
          });
        }, methods: r({}, m, f) };
      }, function(e2, t, n) {
        (e2.exports = n(19)()).push([e2.i, ".vue-map-container{position:relative}.vue-map-container .vue-map{left:0;right:0;top:0;bottom:0;position:absolute}.vue-map-hidden{display:none}", ""]);
      }, function(e2, t, n) {
        var r = n(31);
        "string" == typeof r && (r = [[e2.i, r, ""]]), r.locals && (e2.exports = r.locals);
        (0, n(16).default)("01ed1b0e", r, true, {});
      }, function(e2, t, n) {
        n.r(t);
        var r = n(6), o = n.n(r);
        for (var a in r) "default" !== a && function(e3) {
          n.d(t, e3, function() {
            return r[e3];
          });
        }(a);
        var i = n(14), u = n(1);
        var s = function(e3) {
          n(32);
        }, c = Object(u.a)(o.a, i.a, i.b, false, s, null, null);
        t.default = c.exports;
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r, o = n(0), a = (r = o) && r.__esModule ? r : { default: r };
        var i = { options: { type: Object, required: false, default: function() {
          return {};
        } }, position: { type: Object, twoWay: true }, zIndex: { type: Number, twoWay: true } };
        t.default = (0, a.default)({ mappedProps: i, events: ["domready", "closeclick", "content_changed"], name: "infoWindow", ctr: function() {
          return google.maps.InfoWindow;
        }, props: { opened: { type: Boolean, default: true } }, inject: { $markerPromise: { default: null } }, mounted: function() {
          var e3 = this.$refs.flyaway;
          e3.parentNode.removeChild(e3);
        }, beforeCreate: function(e3) {
          var t2 = this;
          if (e3.content = this.$refs.flyaway, this.$markerPromise) return delete e3.position, this.$markerPromise.then(function(e4) {
            return t2.$markerObject = e4, e4;
          });
        }, methods: { _openInfoWindow: function() {
          this.opened ? null !== this.$markerObject ? this.$infoWindowObject.open(this.$map, this.$markerObject) : this.$infoWindowObject.open(this.$map) : this.$infoWindowObject.close();
        } }, afterCreate: function() {
          var e3 = this;
          this._openInfoWindow(), this.$watch("opened", function() {
            e3._openInfoWindow();
          });
        } });
      }, function(e2, t, n) {
        n.r(t);
        var r = n(7), o = n.n(r);
        for (var a in r) "default" !== a && function(e3) {
          n.d(t, e3, function() {
            return r[e3];
          });
        }(a);
        var i = n(15), u = n(1), s = Object(u.a)(o.a, i.a, i.b, false, null, null, null);
        t.default = s.exports;
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r, o = n(0), a = (r = o) && r.__esModule ? r : { default: r };
        var i = { bounds: { type: Object, twoWay: true }, draggable: { type: Boolean, default: false }, editable: { type: Boolean, default: false }, options: { type: Object, twoWay: false } };
        t.default = (0, a.default)({ mappedProps: i, name: "rectangle", ctr: function() {
          return google.maps.Rectangle;
        }, events: ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"] });
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r, o = n(0), a = (r = o) && r.__esModule ? r : { default: r };
        var i = { center: { type: Object, twoWay: true, required: true }, radius: { type: Number, twoWay: true }, draggable: { type: Boolean, default: false }, editable: { type: Boolean, default: false }, options: { type: Object, twoWay: false } };
        t.default = (0, a.default)({ mappedProps: i, name: "circle", ctr: function() {
          return google.maps.Circle;
        }, events: ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"] });
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r, o = /* @__PURE__ */ function() {
          return function(e3, t2) {
            if (Array.isArray(e3)) return e3;
            if (Symbol.iterator in Object(e3)) return function(e4, t3) {
              var n2 = [], r2 = true, o2 = false, a2 = void 0;
              try {
                for (var i2, u2 = e4[Symbol.iterator](); !(r2 = (i2 = u2.next()).done) && (n2.push(i2.value), !t3 || n2.length !== t3); r2 = true) ;
              } catch (e5) {
                o2 = true, a2 = e5;
              } finally {
                try {
                  !r2 && u2.return && u2.return();
                } finally {
                  if (o2) throw a2;
                }
              }
              return n2;
            }(e3, t2);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), a = n(0), i = (r = a) && r.__esModule ? r : { default: r };
        var u = { draggable: { type: Boolean }, editable: { type: Boolean }, options: { type: Object }, path: { type: Array, twoWay: true, noBind: true }, paths: { type: Array, twoWay: true, noBind: true } };
        t.default = (0, i.default)({ props: { deepWatch: { type: Boolean, default: false } }, events: ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], mappedProps: u, name: "polygon", ctr: function() {
          return google.maps.Polygon;
        }, beforeCreate: function(e3) {
          e3.path || delete e3.path, e3.paths || delete e3.paths;
        }, afterCreate: function(e3) {
          var t2 = this, n2 = function() {
          };
          this.$watch("paths", function(r2) {
            if (r2) {
              n2(), e3.setPaths(r2);
              for (var a2 = function() {
                t2.$emit("paths_changed", e3.getPaths());
              }, i2 = [], u2 = e3.getPaths(), s = 0; s < u2.getLength(); s++) {
                var c = u2.getAt(s);
                i2.push([c, c.addListener("insert_at", a2)]), i2.push([c, c.addListener("remove_at", a2)]), i2.push([c, c.addListener("set_at", a2)]);
              }
              i2.push([u2, u2.addListener("insert_at", a2)]), i2.push([u2, u2.addListener("remove_at", a2)]), i2.push([u2, u2.addListener("set_at", a2)]), n2 = function() {
                i2.map(function(e4) {
                  var t3 = o(e4, 2), n3 = (t3[0], t3[1]);
                  return google.maps.event.removeListener(n3);
                });
              };
            }
          }, { deep: this.deepWatch, immediate: true }), this.$watch("path", function(r2) {
            if (r2) {
              n2(), e3.setPaths(r2);
              var a2 = e3.getPath(), i2 = [], u2 = function() {
                t2.$emit("path_changed", e3.getPath());
              };
              i2.push([a2, a2.addListener("insert_at", u2)]), i2.push([a2, a2.addListener("remove_at", u2)]), i2.push([a2, a2.addListener("set_at", u2)]), n2 = function() {
                i2.map(function(e4) {
                  var t3 = o(e4, 2), n3 = (t3[0], t3[1]);
                  return google.maps.event.removeListener(n3);
                });
              };
            }
          }, { deep: this.deepWatch, immediate: true });
        } });
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r, o = /* @__PURE__ */ function() {
          return function(e3, t2) {
            if (Array.isArray(e3)) return e3;
            if (Symbol.iterator in Object(e3)) return function(e4, t3) {
              var n2 = [], r2 = true, o2 = false, a2 = void 0;
              try {
                for (var i2, u2 = e4[Symbol.iterator](); !(r2 = (i2 = u2.next()).done) && (n2.push(i2.value), !t3 || n2.length !== t3); r2 = true) ;
              } catch (e5) {
                o2 = true, a2 = e5;
              } finally {
                try {
                  !r2 && u2.return && u2.return();
                } finally {
                  if (o2) throw a2;
                }
              }
              return n2;
            }(e3, t2);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), a = n(0), i = (r = a) && r.__esModule ? r : { default: r };
        var u = { draggable: { type: Boolean }, editable: { type: Boolean }, options: { twoWay: false, type: Object }, path: { type: Array, twoWay: true } };
        t.default = (0, i.default)({ mappedProps: u, props: { deepWatch: { type: Boolean, default: false } }, events: ["click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], name: "polyline", ctr: function() {
          return google.maps.Polyline;
        }, afterCreate: function() {
          var e3 = this, t2 = function() {
          };
          this.$watch("path", function(n2) {
            if (n2) {
              t2(), e3.$polylineObject.setPath(n2);
              var r2 = e3.$polylineObject.getPath(), a2 = [], i2 = function() {
                e3.$emit("path_changed", e3.$polylineObject.getPath());
              };
              a2.push([r2, r2.addListener("insert_at", i2)]), a2.push([r2, r2.addListener("remove_at", i2)]), a2.push([r2, r2.addListener("set_at", i2)]), t2 = function() {
                a2.map(function(e4) {
                  var t3 = o(e4, 2), n3 = (t3[0], t3[1]);
                  return google.maps.event.removeListener(n3);
                });
              };
            }
          }, { deep: this.deepWatch, immediate: true });
        } });
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r, o = n(0), a = (r = o) && r.__esModule ? r : { default: r };
        var i = { animation: { twoWay: true, type: Number }, attribution: { type: Object }, clickable: { type: Boolean, twoWay: true, default: true }, cursor: { type: String, twoWay: true }, draggable: { type: Boolean, twoWay: true, default: false }, icon: { twoWay: true }, label: {}, opacity: { type: Number, default: 1 }, options: { type: Object }, place: { type: Object }, position: { type: Object, twoWay: true }, shape: { type: Object, twoWay: true }, title: { type: String, twoWay: true }, zIndex: { type: Number, twoWay: true }, visible: { twoWay: true, default: true } };
        t.default = (0, a.default)({ mappedProps: i, events: ["click", "rightclick", "dblclick", "drag", "dragstart", "dragend", "mouseup", "mousedown", "mouseover", "mouseout"], name: "marker", ctr: function() {
          return google.maps.Marker;
        }, inject: { $clusterPromise: { default: null } }, render: function(e3) {
          return this.$slots.default && 0 !== this.$slots.default.length ? 1 === this.$slots.default.length ? this.$slots.default[0] : e3("div", this.$slots.default) : "";
        }, destroyed: function() {
          this.$markerObject && (this.$clusterObject ? this.$clusterObject.removeMarker(this.$markerObject, true) : this.$markerObject.setMap(null));
        }, beforeCreate: function(e3) {
          return this.$clusterPromise && (e3.map = null), this.$clusterPromise;
        }, afterCreate: function(e3) {
          var t2 = this;
          this.$clusterPromise && this.$clusterPromise.then(function(n2) {
            n2.addMarker(e3), t2.$clusterObject = n2;
          });
        } });
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        }, o = false;
        t.loadGmapApi = function(e3, t2) {
          if ("undefined" != typeof document) {
            if (o) throw new Error("You already started the loading of google maps");
            o = true;
            var n2 = document.createElement("SCRIPT");
            if ("object" !== (void 0 === e3 ? "undefined" : r(e3))) throw new Error("options should  be an object");
            Array.prototype.isPrototypeOf(e3.libraries) && (e3.libraries = e3.libraries.join(",")), e3.callback = "vueGoogleMapsInit";
            var a = "https://maps.googleapis.com/";
            "boolean" == typeof t2 && true === t2 && (a = "https://maps.google.cn/");
            var i = a + "maps/api/js?" + Object.keys(e3).map(function(t3) {
              return encodeURIComponent(t3) + "=" + encodeURIComponent(e3[t3]);
            }).join("&");
            n2.setAttribute("src", i), n2.setAttribute("async", ""), n2.setAttribute("defer", ""), document.head.appendChild(n2);
          }
        };
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e3) {
          var t2 = false, n2 = void 0;
          return function() {
            return t2 || (t2 = true, n2 = e3()), n2;
          };
        };
      }, function(e2, t, n) {
        Object.defineProperty(t, "__esModule", { value: true }), t.StreetViewPanorama = t.MountableMixin = t.Autocomplete = t.MapElementFactory = t.MapElementMixin = t.PlaceInput = t.Map = t.InfoWindow = t.Rectangle = t.Cluster = t.Circle = t.Polygon = t.Polyline = t.Marker = t.loadGmapApi = void 0;
        var r = Object.assign || function(e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e3[r2] = n2[r2]);
          }
          return e3;
        };
        t.install = function(e3, t2) {
          t2 = r({ installComponents: true, autobindAllEvents: false }, t2), j = new e3({ data: { gmapApi: null } });
          var n2 = new e3(), v2 = function(e4) {
            function t3() {
              return j.gmapApi = {}, window.google;
            }
            if (e4.load) return (0, o.default)(function() {
              return "undefined" == typeof window ? new Promise(function() {
              }).then(t3) : new Promise(function(t4, n4) {
                try {
                  window.vueGoogleMapsInit = t4, (0, a.loadGmapApi)(e4.load, e4.loadCn);
                } catch (e5) {
                  n4(e5);
                }
              }).then(t3);
            });
            var n3 = new Promise(function(e5) {
              "undefined" != typeof window && (window.vueGoogleMapsInit = e5);
            }).then(t3);
            return (0, o.default)(function() {
              return n3;
            });
          }(t2);
          e3.mixin({ created: function() {
            this.$gmapDefaultResizeBus = n2, this.$gmapOptions = t2, this.$gmapApiPromiseLazy = v2;
          } }), e3.$gmapDefaultResizeBus = n2, e3.$gmapApiPromiseLazy = v2, t2.installComponents && (e3.component("GmapMap", d.default), e3.component("GmapMarker", i.default), e3.component("GmapInfoWindow", p.default), e3.component("GmapPolyline", u.default), e3.component("GmapPolygon", s.default), e3.component("GmapCircle", c.default), e3.component("GmapRectangle", l.default), e3.component("GmapAutocomplete", h.default), e3.component("GmapPlaceInput", m.default), e3.component("GmapStreetViewPanorama", f.default));
        }, t.gmapApi = function() {
          return j.gmapApi && window.google;
        };
        var o = g(n(42)), a = n(41), i = g(n(40)), u = g(n(39)), s = g(n(38)), c = g(n(37)), l = g(n(36)), p = g(n(35)), d = g(n(33)), f = g(n(29)), m = g(n(25)), h = g(n(24)), v = g(n(20)), y = g(n(0)), b = g(n(8));
        function g(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        var _2, w = (_2 = n(22)).default || _2, j = null;
        t.loadGmapApi = a.loadGmapApi, t.Marker = i.default, t.Polyline = u.default, t.Polygon = s.default, t.Circle = c.default, t.Cluster = w, t.Rectangle = l.default, t.InfoWindow = p.default, t.Map = d.default, t.PlaceInput = m.default, t.MapElementMixin = v.default, t.MapElementFactory = y.default, t.Autocomplete = h.default, t.MountableMixin = b.default, t.StreetViewPanorama = f.default;
      }, function(e2, t, n) {
        e2.exports = n(43);
      }]);
    });
  })(vueGoogleMaps$1);
  return vueGoogleMaps$1.exports;
}
var vueGoogleMapsExports = requireVueGoogleMaps();
const vueGoogleMaps = /* @__PURE__ */ getDefaultExportFromCjs(vueGoogleMapsExports);
const VueGoogleMaps = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: vueGoogleMaps
}, [vueGoogleMapsExports]);
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/build/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p) => Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const _sfc_main$3 = {
  mixins: [
    mixinsFilters
  ],
  components: {
    "mercadopago-checkout": () => __vitePreload(() => import("./MercadoPagoCheckout-CjX8ufZs.js"), true ? __vite__mapDeps([0,1,2]) : void 0)
  },
  props: [
    "tickets",
    "max_ticket_qty",
    "event",
    "currency",
    "login_user_id",
    "is_admin",
    "is_organiser",
    "is_customer",
    "is_paypal",
    "is_mercadopago",
    "is_offline_payment_organizer",
    "is_offline_payment_customer",
    "booked_tickets"
  ],
  data() {
    return {
      openModal: false,
      ticket_info: false,
      moment,
      quantity: [1],
      price: null,
      total_price: [],
      customer_id: 0,
      total: 0,
      disable: false,
      payment_method: "offline",
      // customers options
      options: [],
      //selected customer
      customer: null,
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      paymentMethods: {
        credit_card: true,
        debit_card: true,
        boleto: true,
        pix: true,
        wallet: true
      },
      installmentOptions: this.generateInstallments(12),
      // 🔑 NOVO: Estados do Mercado Pago
      isWaitingPayment: false,
      paymentConfirmed: false
    };
  },
  computed: {
    // get global variables
    ...mapState(["booking_date", "start_time", "end_time", "booking_end_date", "booked_date_server"])
  },
  watch: {
    payment_method(newValue) {
      if (newValue == 2) {
        this.$nextTick(() => {
          this.scrollToMercadoPagoForm();
        });
      }
    }
  },
  mounted() {
    console.log("=== DEBUG TICKET LIST ===");
    console.log("is_admin:", this.is_admin);
    console.log("is_mercadopago:", this.is_mercadopago);
    console.log("is_paypal:", this.is_paypal);
    console.log("is_customer:", this.is_customer);
    console.log("is_organiser:", this.is_organiser);
    console.log("Condição Mercado Pago (is_admin <= 0 && is_mercadopago > 0):", this.is_admin <= 0 && this.is_mercadopago > 0);
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    generateInstallments(maxInstallments) {
      const options = [];
      for (let i = 1; i <= maxInstallments; i++) {
        options.push({
          value: i,
          label: i === 1 ? "1x sem juros" : `${i}x ${i <= 6 ? "sem juros" : "com juros"}`
        });
      }
      return options;
    },
    // reset form and close modal
    close: function() {
      this.price = null;
      this.quantity = [];
      this.total_price = [];
      this.add({
        booking_date: null,
        booked_date_server: null,
        booking_end_date: null,
        start_time: null,
        end_time: null
      });
      this.openModal = false;
    },
    bookTickets() {
      console.log("=== BOOK TICKETS INICIADO ===");
      console.log("payment_method:", this.payment_method);
      console.log("total:", this.total);
      this.disable = true;
      if (this.total <= 0) {
        console.log("Processando como ingresso gratuito");
        this.processFreeTickets();
        return;
      }
      if (this.payment_method == 2) {
        console.log("Mercado Pago selecionado - processando pagamento");
        let selectedTicket = null;
        for (let i = 0; i < this.tickets.length; i++) {
          if (this.quantity[i] && parseInt(this.quantity[i]) > 0) {
            selectedTicket = this.tickets[i];
            console.log("Ticket selecionado:", selectedTicket);
            break;
          }
        }
        if (this.$refs.mercadoPagoCheckout) {
          this.$refs.mercadoPagoCheckout.setSelectedTicket(selectedTicket);
          this.$refs.mercadoPagoCheckout.processPayment();
        } else {
          console.error("MercadoPagoCheckout ref não encontrado");
        }
        this.disable = false;
        return;
      }
      console.log("Enviando para backend:", route("eventmie.bookings_book_tickets"));
      let post_url = route("eventmie.bookings_book_tickets");
      let post_data = new FormData(this.$refs.form);
      axios.post(post_url, post_data).then((res) => {
        console.log("Resposta recebida:", res.data);
        if (res.data.status && res.data.message != "" && typeof res.data.message != "undefined") {
          Swal.hideLoading();
          this.close();
          this.showNotification("success", res.data.message);
        } else if (!res.data.status && res.data.message != "" && res.data.url != "" && typeof res.data.url != "undefined") {
          Swal.hideLoading();
          this.close();
          this.showNotification("error", res.data.message);
          setTimeout(() => {
            window.location.href = res.data.url;
          }, 1e3);
        }
        if (res.data.payment_method == "mercadopago" && res.data.status) {
          Swal.hideLoading();
          this.close();
          this.scrollToMercadoPagoForm();
        }
        if (res.data.url != "" && res.data.status && typeof res.data.url != "undefined") {
          Swal.hideLoading();
          setTimeout(() => {
            window.location.href = res.data.url;
          }, 1e3);
        }
        if (!res.data.status && res.data.message != "" && typeof res.data.message != "undefined") {
          Swal.hideLoading();
          this.close();
          this.showNotification("error", res.data.message);
        }
      }).catch((error) => {
        console.error("Erro na requisição:", error);
        console.error("Resposta de erro:", error.response);
        Swal.hideLoading();
        this.disable = false;
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          console.log("Erros de validação:", serrors);
          this.serverValidate(serrors);
        }
      });
    },
    scrollToMercadoPagoForm() {
      const element = document.querySelector(".mercadopago-checkout-container");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    processFreeTickets() {
      let post_url = route("eventmie.bookings_book_tickets");
      let post_data = new FormData(this.$refs.form);
      post_data.set("payment_method", "offline");
      axios.post(post_url, post_data).then((res) => {
        Swal.hideLoading();
        if (res.data.status && res.data.message != "" && typeof res.data.message != "undefined") {
          this.close();
          this.showNotification("success", res.data.message);
          if (res.data.url != "" && typeof res.data.url != "undefined") {
            setTimeout(() => {
              window.location.href = res.data.url;
            }, 1e3);
          }
        } else if (!res.data.status && res.data.message != "") {
          this.close();
          this.showNotification("error", res.data.message);
        }
      }).catch((error) => {
        this.disable = false;
        Swal.hideLoading();
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    // validate data on form submit
    validateForm(e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.disable = true;
          this.formSubmit(e);
        } else {
          this.disable = false;
        }
      });
    },
    // show server validation errors
    serverValidate(serrors) {
      this.disable = false;
      this.$validator.validateAll().then((result) => {
        this.$validator.errors.add(serrors);
      });
    },
    // count total tax
    countTax(price, tax, rate_type, net_price, quantity) {
      price = parseFloat(price).toFixed(2);
      tax = parseFloat(tax).toFixed(2);
      var total_tax = parseFloat(quantity * tax).toFixed(2);
      if (rate_type == "percent") {
        if (isNaN(price * total_tax / 100))
          return 0;
        total_tax = parseFloat(price * total_tax / 100).toFixed(2);
        if (net_price == "excluding")
          return total_tax + " " + this.currency + " (" + tax + "% " + trans("em.exclusive") + ")";
        else
          return total_tax + " " + this.currency + " (" + tax + "% " + trans("em.inclusive") + ")";
      }
      if (rate_type == "fixed") {
        if (net_price == "excluding")
          return total_tax + " " + this.currency + " (" + tax + " " + this.currency + " " + trans("em.exclusive") + ")";
        else
          return total_tax + " " + this.currency + " (" + tax + " " + this.currency + " " + trans("em.inclusive") + ")";
      }
      return 0;
    },
    // count total price
    totalPrice() {
      if (this.quantity != null || this.quantity.length > 0) {
        let amount;
        let tax;
        let total_tax;
        this.quantity.forEach((function(value, key) {
          total_tax = 0;
          this.total_price[key] = [];
          amount = parseFloat(value * this.tickets[key].price).toFixed(2);
          if (Object.keys(this.total_price).length > 0) {
            this.total_price.forEach((function(v, k) {
              if (Object.keys(v).length <= 0) ;
              this.total_price[key] = amount;
            }).bind(this));
          }
          if (this.tickets[key].taxes.length > 0 && amount > 0) {
            this.tickets[key].taxes.forEach((function(tax_v, tax_k) {
              if (tax_v.rate_type == "percent") {
                if (tax_v.net_price == "excluding") {
                  tax = isNaN(amount * tax_v.rate / 100) ? 0 : parseFloat(amount * tax_v.rate / 100).toFixed(2);
                  total_tax = parseFloat(total_tax) + parseFloat(tax);
                }
              }
              if (tax_v.rate_type == "fixed") {
                tax = parseFloat(value * tax_v.rate);
                if (tax_v.net_price == "excluding")
                  total_tax = parseFloat(total_tax) + parseFloat(tax);
              }
            }).bind(this));
          }
          this.total_price[key] = (parseFloat(amount) + parseFloat(total_tax)).toFixed(2);
        }).bind(this));
      }
    },
    updateItem() {
      this.$emit("changeItem");
    },
    setDefaultQuantity() {
      var _this = this;
      var promise = new Promise(function(resolve, reject) {
        if (_this.quantity.length == 1) {
          _this.tickets.forEach((function(value, key) {
            if (key == 0)
              _this.quantity[key] = 0;
            else
              _this.quantity[key] = 0;
          }).bind());
        }
        resolve(true);
      });
      promise.then(function(successMessage) {
        _this.totalPrice();
        _this.orderTotal();
      }, function(errorMessage) {
      });
    },
    // count prise all booked tickets
    orderTotal() {
      this.total = 0;
      if (Object.keys(this.total_price).length > 0) {
        this.total_price.forEach((function(value, key) {
          this.total = (parseFloat(this.total) + parseFloat(value)).toFixed(2);
        }).bind(this));
        return this.total;
      }
      return 0;
    },
    // total booked tickets
    bookedTicketsTotal() {
      let total = 0;
      if (this.quantity.length > 0) {
        this.quantity.forEach((function(value, key) {
          total = parseInt(total) + parseInt(value);
        }).bind(this));
        return total;
      }
      return 0;
    },
    defaultPaymentMethod() {
      if (this.is_admin <= 0 && this.bookedTicketsTotal() > 0)
        this.payment_method = 1;
    },
    loginFirst() {
      window.location.href = route("eventmie.login_first");
    },
    signupFirst() {
      window.location.href = route("eventmie.signup_first");
    },
    // get customers
    getCustomers(loading, search = null) {
      var postUrl = route("eventmie.get_customers");
      var _this = this;
      axios.post(postUrl, {
        "search": search
      }).then((res) => {
        var promise = new Promise(function(resolve, reject) {
          _this.options = res.data.customers;
          resolve(true);
        });
        promise.then(function(successMessage) {
          loading(false);
        }, function(errorMessage) {
          console.log(errorMessage);
        });
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    // v-select methods
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    // v-select methods
    search: _.debounce((loading, search, vm) => {
      if (vm.validateEmail(search))
        vm.getCustomers(loading, search);
      else
        loading(false);
    }, 350),
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    scrollToBottom() {
      this.$refs["bottom-down"].scrollIntoView({ block: "end", inline: "nearest" });
    }
  },
  watch: {
    quantity: function() {
      this.totalPrice();
      this.orderTotal();
      this.defaultPaymentMethod();
    },
    tickets: function() {
      this.setDefaultQuantity();
      this.totalPrice();
      this.orderTotal();
    },
    // active when customer search 
    customer: function() {
      this.customer_id = this.customer != null ? this.customer.id : null;
    }
  },
  mounted() {
    this.openModal = true;
    this.setDefaultQuantity();
    this.defaultPaymentMethod();
  }
};
var _sfc_render$3 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-3" }, [_vm.openModal ? _c("div", { ref: "modal_custom", class: { "overflow-hidden": _vm.overflowHidden } }, [_c("div", [_c("div", [_c("div", [_c("form", { ref: "form", attrs: { "method": "POST" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { staticClass: "form-control", attrs: { "type": "hidden", "name": "event_id" }, domProps: { "value": _vm.tickets[0].event_id } }), _c("input", { staticClass: "form-control", attrs: { "type": "hidden", "name": "booking_date" }, domProps: { "value": _vm.serverTimezone(_vm.booking_date + " " + _vm.start_time, "dddd LL HH:mm a").format("YYYY-MM-DD") } }), !_vm.event.merge_schedule ? _c("input", { staticClass: "form-control", attrs: { "type": "hidden", "name": "booking_end_date" }, domProps: { "value": _vm.booking_end_date != null && typeof _vm.booking_end_date != "undefined" && _vm.booking_end_date != false ? _vm.serverTimezone(_vm.moment(_vm.booking_date).format("dddd LL") + " " + _vm.end_time, "dddd LL HH:mm a").locale("en").format("YYYY-MM-DD") : null } }) : _c("input", { staticClass: "form-control", attrs: { "type": "hidden", "name": "booking_end_date" }, domProps: { "value": _vm.booking_end_date != null && typeof _vm.booking_end_date != "undefined" && _vm.booking_end_date != false ? _vm.serverTimezone(_vm.moment(_vm.booking_end_date).format("dddd LL") + " " + _vm.end_time, "dddd LL HH:mm a").locale("en").format("YYYY-MM-DD") : null } }), _c("input", { staticClass: "form-control", attrs: { "type": "hidden", "name": "start_time" }, domProps: { "value": _vm.serverTimezone(_vm.booking_date + " " + _vm.start_time, "dddd LL HH:mm a").format("HH:mm:ss") } }), _c("input", { staticClass: "form-control", attrs: { "type": "hidden", "name": "end_time" }, domProps: { "value": _vm.serverTimezone((_vm.booking_end_date == null ? _vm.booking_date : _vm.booking_end_date) + " " + _vm.end_time, "dddd LL HH:mm a").format("HH:mm:ss") } }), _c("input", { staticClass: "form-control", attrs: { "type": "hidden", "name": "merge_schedule" }, domProps: { "value": _vm.event.merge_schedule } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.customer_id, expression: "customer_id" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], attrs: { "type": "hidden", "name": "customer_id" }, domProps: { "value": _vm.customer_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.customer_id = $event.target.value;
  } } }), _c("div", {}, [_vm.is_customer <= 0 ? _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-4 mb-3" }, [_vm.is_customer <= 0 ? _c("div", [_c("label", { staticClass: "form-label h6", attrs: { "for": "customer_id" } }, [_vm._v(_vm._s(_vm.trans("em.select_customer")))]), _c("v-select", { staticClass: "form-control px-0 py-0 border-0 mb-2", attrs: { "label": "name", "placeholder": _vm.trans("em.search_customer_email"), "required": !_vm.customer, "filterable": false, "options": _vm.options }, on: { "search": _vm.onSearch }, model: { value: _vm.customer, callback: function($$v) {
    _vm.customer = $$v;
  }, expression: "customer" } }, [_c("div", { attrs: { "slot": "no-options" }, slot: "no-options" }, [_vm._v(_vm._s(_vm.trans("em.customer_not_found")))])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("customer_id"), expression: "errors.has('customer_id')" }], staticClass: "invalid-feedback danger" }, [_vm._v(_vm._s(_vm.errors.first("customer_id")))])], 1) : _vm._e()])]) : _vm._e(), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-12" }, [_c("ul", { staticClass: "list-group" }, _vm._l(_vm.tickets, function(item, index2) {
    return _c("li", { key: index2, staticClass: "list-group-item mb-3 rounded border-2" }, [_c("input", { staticClass: "formbh g-control", attrs: { "type": "hidden", "name": "ticket_id[]" }, domProps: { "value": item.id } }), _c("input", { staticClass: "form-control", attrs: { "type": "hidden", "name": "ticket_title[]" }, domProps: { "value": item.title } }), _c("div", { staticClass: "d-flex justify-content-between lh-condensed d-flex-wrap" }, [_c("div", { staticClass: "w-40" }, [_c("h6", { staticClass: "my-0" }, [_c("strong", [_vm._v(_vm._s(item.title))])]), _c("p", { staticClass: "my-0 h6" }, [_c("small", [_vm._v(_vm._s(_vm.currency))]), _vm._v(" " + _vm._s(item.price > 0 ? item.price : "0.00"))])]), _c("div", { staticClass: "w-20" }, [typeof _vm.booked_tickets[item.id + "-" + _vm.booked_date_server] != "undefined" ? _c("div", [(item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) <= 100 ? _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.quantity[index2], expression: "quantity[index]" }], staticClass: "form-select border-2 form-select-lg", attrs: { "name": "quantity[]" }, on: { "change": function($event) {
      var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
        return o.selected;
      }).map(function(o) {
        var val = "_value" in o ? o._value : o.value;
        return val;
      });
      _vm.$set(_vm.quantity, index2, $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
    } } }, [_c("option", { attrs: { "value": "0", "selected": "" } }, [_vm._v("0")]), _vm._l(_vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant, function(itm, ind) {
      return _vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant <= (item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) ? _c("option", { key: ind, domProps: { "value": itm } }, [_vm._v(_vm._s(itm))]) : _vm._l(item.quantity > (item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) ? parseInt(item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) : parseInt(item.quantity), function(itm2, ind2) {
        return _c("option", { key: ind2, domProps: { "value": itm2 } }, [_vm._v(_vm._s(itm2))]);
      });
    })], 2) : _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.quantity[index2], expression: "quantity[index]" }], staticClass: "form-control form-input-sm", attrs: { "type": "number", "name": "quantity[]", "value": "0", "min": "0", "max": _vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant < (item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) ? _vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant : item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty }, domProps: { "value": _vm.quantity[index2] }, on: { "input": function($event) {
      if ($event.target.composing) return;
      _vm.$set(_vm.quantity, index2, $event.target.value);
    } } }), _vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant < (item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) && _vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant > 0 ? _c("p", { staticClass: "text-muted" }, [_c("small", [_c("i", { staticClass: "fas fa-exclamation" }), _vm._v(" " + _vm._s(_vm.trans("em.vacant")) + " " + _vm._s(_vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant))])]) : _vm._e(), _vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant < (item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) && _vm.booked_tickets[item.id + "-" + _vm.booked_date_server].total_vacant <= 0 ? _c("p", { staticClass: "text-danger" }, [_c("small", [_c("i", { staticClass: "fas fa-times-circle" }), _vm._v(" " + _vm._s(_vm.trans("em.vacant")) + " 0")])]) : _vm._e()]) : _c("div", [(item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) <= 100 ? _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.quantity[index2], expression: "quantity[index]" }], staticClass: "form-select border-2 form-select-lg", attrs: { "name": "quantity[]" }, on: { "change": function($event) {
      var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
        return o.selected;
      }).map(function(o) {
        var val = "_value" in o ? o._value : o.value;
        return val;
      });
      _vm.$set(_vm.quantity, index2, $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
    } } }, [_c("option", { attrs: { "value": "0", "selected": "" } }, [_vm._v("0")]), _vm._l(item.quantity > (item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) ? parseInt(item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) : parseInt(item.quantity), function(itm, ind) {
      return _c("option", { key: ind, domProps: { "value": itm } }, [_vm._v(_vm._s(itm))]);
    })], 2) : _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.quantity[index2], expression: "quantity[index]" }], staticClass: "form-control form-input-sm", attrs: { "type": "number", "name": "quantity[]", "value": "0", "min": "0", "max": item.quantity > (item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) ? parseInt(item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) : parseInt(item.quantity) }, domProps: { "value": _vm.quantity[index2] }, on: { "input": function($event) {
      if ($event.target.composing) return;
      _vm.$set(_vm.quantity, index2, $event.target.value);
    } } }), item.quantity < (item.customer_limit != null ? item.customer_limit : _vm.max_ticket_qty) && item.quantity > 0 ? _c("p", { staticClass: "text-primary h6 text-nowrap" }, [_c("small", [_c("i", { staticClass: "fas fa-exclamation" }), _vm._v(" " + _vm._s(_vm.trans("em.vacant")) + " " + _vm._s(item.quantity))])]) : _vm._e(), item.quantity <= 0 ? _c("p", { staticClass: "text-danger" }, [_c("small", [_c("i", { staticClass: "fas fa-times-circle" }), _vm._v(" " + _vm._s(_vm.trans("em.vacant")) + " 0")])]) : _vm._e()])]), _c("div", [_c("strong", [_c("small", [_vm._v(_vm._s(_vm.currency))]), _vm._v(" " + _vm._s(_vm.total_price[index2] ? _vm.total_price[index2] : "0.00") + " ")]), _vm.quantity[index2] > 0 ? _c("span", [_c("i", { staticClass: "fas fa-check-circle text-success" })]) : _vm._e()])]), _c("div", { staticClass: "break-flex w-30 w-m-100" }, [_vm.quantity[index2] > 0 && item.price > 0 && item.taxes.length > 0 ? _c("ul", { staticClass: "list-group list-group-flush my-2" }, _vm._l(item.taxes, function(tax, index1) {
      return _c("li", { key: index1, staticClass: "list-group-item small px-2 p-1 text-muted" }, [_c("span", [_vm._v(_vm._s(tax.title) + " "), _c("small", [_vm._v(_vm._s(_vm.total_price[index2] > 0 ? _vm.countTax(item.price, tax.rate, tax.rate_type, tax.net_price, _vm.quantity[index2]) : 0))])])]);
    }), 0) : _vm._e()]), _c("div", { staticClass: "break-flex" }, [_c("a", { staticClass: "pointer ticket-info-toggle small", on: { "click": function($event) {
      _vm.ticket_info = !_vm.ticket_info;
    } } }, [_vm.ticket_info ? _c("small", [_vm._v(_vm._s(_vm.trans("em.hide_info")))]) : _c("small", [_vm._v(_vm._s(_vm.trans("em.show_info")))])]), _vm.ticket_info ? _c("p", { staticClass: "ticket-info small text-muted" }, [_vm._v(_vm._s(item.description))]) : _vm._e()])]);
  }), 0)])]), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-12" }, [_c("p", { staticClass: "mb-2 h6" }, [_vm._v(_vm._s(_vm.trans("em.cart")))]), _c("ul", { staticClass: "list-group" }, [_c("li", { staticClass: "list-group-item mb-3 rounded border-2" }, [_c("div", { staticClass: "d-flex justify-content-between" }, [_c("h6", { staticClass: "my-0" }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.total_tickets")))])]), _c("strong", { class: { "ticket-selected-text": _vm.bookedTicketsTotal() > 0 } }, [_vm._v(_vm._s(_vm.bookedTicketsTotal()))])]), _c("div", { staticClass: "d-flex justify-content-between" }, [_c("h6", { staticClass: "my-0" }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.total_order")))])]), _c("strong", { class: { "ticket-selected-text": _vm.bookedTicketsTotal() > 0 } }, [_c("small", [_vm._v(_vm._s(_vm.currency))]), _vm._v(" " + _vm._s(_vm.total))])])])])])]), !_vm.login_user_id ? _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-12" }, [_c("div", { staticClass: "w-100 mb-3" }, [_c("div", { staticClass: "alert alert-danger" }, [_vm._v(" " + _vm._s(_vm.trans("em.please_login_signup")) + " ")])])])]) : _vm._e(), _vm.bookedTicketsTotal() > 0 && _vm.login_user_id ? _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-12 payment-options mb-3" }, [_c("div", { staticClass: "border rounded border-1 border-dark list-group-flush px-2 bg-white" }, [_vm.total <= 0 ? _c("div", { staticClass: "d-block my-3 pl-3" }, [_c("div", { staticClass: "radio-inline" }, [_c("input", { staticClass: "custom-control-input", attrs: { "id": "free_order", "name": "free_order", "type": "radio", "checked": "" } }), _c("label", { staticClass: "custom-control-label", attrs: { "for": "free_order" } }, [_vm._v("  "), _c("i", { staticClass: "fas fa-glass-cheers" }), _vm._v(" " + _vm._s(_vm.trans("em.free")))])])]) : _c("div", { staticClass: "d-block my-3 pl-3" }, [_vm.is_admin <= 0 && _vm.is_paypal > 0 ? _c("div", { staticClass: "radio-inline" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.payment_method, expression: "payment_method" }], staticClass: "custom-control-input", attrs: { "type": "radio", "id": "payment_method_paypal", "name": "payment_method", "value": "1" }, domProps: { "checked": _vm._q(_vm.payment_method, "1") }, on: { "change": function($event) {
    _vm.payment_method = "1";
  } } }), _vm._m(0)]) : _vm._e(), _vm.is_admin <= 0 && _vm.is_mercadopago > 0 ? _c("div", { staticClass: "radio-inline" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.payment_method, expression: "payment_method" }], staticClass: "custom-control-input", attrs: { "type": "radio", "id": "payment_method_mercadopago", "name": "payment_method", "value": "2" }, domProps: { "checked": _vm._q(_vm.payment_method, "2") }, on: { "change": function($event) {
    _vm.payment_method = "2";
  } } }), _vm._m(1)]) : _vm._e(), _vm.is_organiser > 0 && _vm.is_offline_payment_organizer > 0 || _vm.is_customer > 0 && _vm.is_offline_payment_customer > 0 || _vm.is_admin > 0 ? _c("div", { staticClass: "radio-inline" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.payment_method, expression: "payment_method" }], staticClass: "custom-control-input", attrs: { "type": "radio", "id": "payment_method_offline", "name": "payment_method", "value": "offline" }, domProps: { "checked": _vm._q(_vm.payment_method, "offline") }, on: { "change": function($event) {
    _vm.payment_method = "offline";
  } } }), _c("label", { staticClass: "custom-control-label", attrs: { "for": "payment_method_offline" } }, [_vm._v("  "), _c("i", { staticClass: "fas fa-suitcase-rolling" }), _vm._v(" " + _vm._s(_vm.trans("em.offline")) + " "), _c("small", [_vm._v("(" + _vm._s(_vm.trans("em.cash_on_arrival")) + ")")])])]) : _vm._e(), _vm.payment_method == "offline" ? _c("p", { staticClass: "text-mute h6 px-3 mt-1" }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.offline_payment_info")) + ": ")]), _c("small", { staticClass: "preserve-whitespace", domProps: { "innerHTML": _vm._s(_vm.event.offline_payment_info) } })]) : _vm._e(), _c("p", { staticClass: "text-mute h6 mt-2 mx-3", domProps: { "innerHTML": _vm._s(_vm.trans("em.order_terms")) } })])])]), _vm.payment_method == 2 && _vm.total > 0 ? _c("div", { staticClass: "col-12 mt-4" }, [_c("mercadopago-checkout", { ref: "mercadoPagoCheckout", attrs: { "event": _vm.event, "tickets": _vm.tickets, "total": _vm.total, "currency": _vm.currency, "booking-data": {
    booking_date: _vm.booking_date,
    booking_end_date: _vm.booking_end_date,
    start_time: _vm.start_time,
    end_time: _vm.end_time
  }, "payment-methods": _vm.paymentMethods, "installment-options": _vm.installmentOptions }, on: { "waiting-payment-changed": function($event) {
    _vm.isWaitingPayment = $event;
  }, "payment-confirmed-changed": function($event) {
    _vm.paymentConfirmed = $event;
  } } })], 1) : _vm._e(), !_vm.paymentConfirmed ? _c("div", { staticClass: "col-12 mt-2 pb-4" }, [_c("div", { staticClass: "d-grid" }, [_c("div", { staticClass: "btn-group btn-group-md btn-block btn-group-justified" }, [_c("button", { staticClass: "btn btn-success btn-lg btn-block fw-bold text-white", class: { "disabled": _vm.disable || _vm.isWaitingPayment }, attrs: { "disabled": _vm.disable || _vm.isWaitingPayment, "type": "button" }, on: { "click": function($event) {
    return _vm.bookTickets();
  } } }, [_c("i", { staticClass: "fas fa-lock" }), _vm._v(" " + _vm._s(_vm.trans("em.checkout")) + " ")])])])]) : _vm._e()]) : _vm._e(), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-12" }, [!_vm.login_user_id ? _c("div", [_c("div", { staticClass: "d-grid pb-4" }, [_c("div", { staticClass: "btn-group btn-group-md btn-block btn-group-justified" }, [_c("button", { staticClass: "btn btn-primary btn-lg", attrs: { "type": "button" }, on: { "click": function($event) {
    return _vm.loginFirst();
  } } }, [_c("i", { staticClass: "fas fa-fingerprint" }), _vm._v(" " + _vm._s(_vm.trans("em.login")))])])])]) : _vm._e()])])])])])])])]) : _vm._e()]);
};
var _sfc_staticRenderFns$3 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("label", { staticClass: "custom-control-label", attrs: { "for": "payment_method_paypal" } }, [_vm._v("  "), _c("i", { staticClass: "fab fa-paypal" }), _vm._v(" PayPal")]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("label", { staticClass: "custom-control-label", attrs: { "for": "payment_method_mercadopago" } }, [_vm._v("  "), _c("i", { staticClass: "fas fa-credit-card" }), _vm._v(" Mercado Pago")]);
}];
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  null
);
const TicketComponent = __component__$3.exports;
const _sfc_main$2 = {
  props: [
    "event",
    "max_ticket_qty",
    "login_user_id",
    "is_admin",
    "is_organiser",
    "is_customer",
    "is_paypal",
    "is_mercadopago",
    "is_offline_payment_organizer",
    "is_offline_payment_customer",
    "tickets",
    "total_capacity",
    "booked_tickets",
    "currency",
    "date_format"
  ],
  mixins: [
    mixinsFilters
  ],
  components: {
    "ticket-component": TicketComponent
  },
  data() {
    return {
      schedules: [],
      all_dates: [],
      selected_dates: [],
      available_dates: [],
      moment: moment$1,
      calculate_months: [],
      // local_time       
      local_from_date: [],
      local_to_date: [],
      local_from_time: [],
      local_to_time: [],
      local_start_date: null,
      local_end_date: null,
      // tab active
      tab_active_index: null,
      //weekly
      week_numbers: [],
      //CUSTOM
      tab_active_index: 0,
      // Default index
      calculate_months: [],
      // Populated with your month data
      schedules: [],
      // Your schedule data
      local_from_date: []
      // Your date data
      //CUSTOM
    };
  },
  computed: {
    // get global variables
    ...mapState(["booking_date", "start_time", "end_time", "booking_end_date", "booked_date_server"])
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    selectDates(booking_date, booking_end_date, start_time, end_time) {
      this.triggerMultiDay(booking_date, booking_end_date, start_time, end_time);
      this.add({
        booking_date: moment$1(booking_date).isValid() ? booking_date : null,
        booked_date_server: moment$1(booking_date).isValid() ? this.serverTimezone(
          moment$1(booking_date).format("dddd LL") + " " + start_time,
          "dddd LL hh:mm A"
        ).format("YYYY-MM-DD") : null,
        booking_end_date: moment$1(booking_end_date).isValid() ? booking_end_date : null,
        start_time: moment$1(start_time, "hh:mm A").isValid() ? start_time : null,
        end_time: moment$1(end_time, "hh:mm A").isValid() ? end_time : null
      });
      this.$nextTick(() => {
        document.querySelectorAll('.schedule-info[data-selected="true"]').forEach((el) => {
          el.removeAttribute("data-selected");
        });
        const formattedBookingDate = moment$1(booking_date, "dddd LL").format(
          "YYYY-MM-DD"
        );
        const scheduleCards = document.querySelectorAll(".schedule-info");
        scheduleCards.forEach((card) => {
          var _a, _b;
          const dateText = (_a = card.querySelector(".text-bolder")) == null ? void 0 : _a.textContent.trim();
          const dateDay = (_b = card.querySelector(".text-xs")) == null ? void 0 : _b.textContent.trim();
          if (dateText && dateDay) {
            const fullDate = this.userTimezone1(
              `${this.calculate_months[this.tab_active_index]}-${dateText} ${this.schedules[this.tab_active_index].from_time}`,
              "YYYY-MM-DD HH:mm:ss"
            ).locale("en").format("YYYY-MM-DD");
            if (fullDate === formattedBookingDate) {
              card.setAttribute("data-selected", "true");
            }
          }
        });
      });
    },
    // getSchedule
    getEventSchedule() {
      let post_url = route("eventmie.event_schedule");
      let post_data = {
        "event_id": this.event.id
      };
      axios.post(post_url, post_data).then((res) => {
        var _this = this;
        this.schedules = res.data.schedules;
        this.convert_to_local_tz();
        this.calculate_months = [];
        this.schedules.forEach(function(value, key) {
          _this.calculate_months[key] = moment$1(value["from_date"], "YYYY-MM-DD").format("YYYY-MM");
        });
        this.generateDates();
        var _this = this;
        this.schedules.every(function(schedule, index2) {
          if (schedule.from_time != null && schedule.to_time != null && (moment$1(moment$1(schedule.from_date, "YYYY-MM-DD").format("MM  YYYY"), "MM  YYYY").isAfter(moment$1(moment$1().format("MM  YYYY"), "MM  YYYY")) || moment$1(moment$1(schedule.from_date, "YYYY-MM-DD").format("MM  YYYY"), "MM  YYYY").isSame(moment$1(moment$1().format("MM  YYYY"), "MM  YYYY")))) {
            _this.tab_active_index = index2;
            return false;
          } else {
            return true;
          }
        });
        this.$nextTick(() => {
          this.selectDefaultDate();
        });
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    // generates all dates
    generateDates() {
      this.calculate_months.forEach((function(value, key) {
        this.all_dates[key] = [];
        var month = moment$1(this.local_from_date[key], "YYYY-MM-DD").format("YYYY-MM");
        var count_days = moment$1(this.local_from_date[key], "YYYY-MM-DD").daysInMonth();
        var i = 1;
        while (i <= count_days) {
          this.all_dates[key].push(moment$1(month + "-" + i, "YYYY-MM-DD"));
          i++;
        }
      }).bind(this));
      if (this.schedules[0].repetitive_type == 1) {
        this.generateDaily();
      } else if (this.schedules[0].repetitive_type == 2) {
        this.generateWeekly();
      } else if (this.schedules[0].repetitive_type == 3) {
        this.generateMonthly();
      }
    },
    // generates selected dates for monthly event
    generateMonthly() {
      var $this = this;
      this.all_dates.forEach(function(ad_value, ad_key) {
        var schedules_dates = [];
        if ($this.schedules[ad_key].repetitive_dates == null)
          return true;
        JSON.parse($this.schedules[ad_key].repetitive_dates.split(",")).forEach(function(v, k) {
          schedules_dates[k] = v;
        });
        $this.selected_dates[ad_key] = [];
        $this.available_dates[ad_key] = [];
        ad_value.forEach(function(date, key) {
          if (schedules_dates.includes(moment$1(date).locale("en").format("DD"))) {
            if (ad_key == 0 && Object.keys($this.calculate_months).length != 1) {
              let previousDay = moment$1().locale("en").subtract(1, "days").format("YYYY-MM-DD");
              if (moment$1($this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment$1(date).locale("en").format("YYYY-MM-DD") || previousDay == moment$1(date).locale("en").format("YYYY-MM-DD")) {
                $this.selected_dates[ad_key].push(moment$1(date).format("DD"));
                $this.addAvailableDates(ad_key, moment$1(date, "YYYY-MM-DD").format("YYYY-MM-DD"), $this, true);
              }
            } else if (ad_key == $this.all_dates.length - 1 && Object.keys($this.calculate_months).length != 1) {
              if (moment$1($this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment$1(date).locale("en").format("YYYY-MM-DD")) {
                $this.selected_dates[ad_key].push(moment$1(date).format("DD"));
                $this.addAvailableDates(ad_key, moment$1(date, "YYYY-MM-DD").format("YYYY-MM-DD"), $this, true);
              }
            }
            if (Object.keys($this.calculate_months).length == 1) {
              if (moment$1($this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment$1(date).locale("en").format("YYYY-MM-DD") && moment$1($this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment$1(date).locale("en").format("YYYY-MM-DD")) {
                $this.selected_dates[ad_key].push(moment$1(date).format("DD"));
                $this.addAvailableDates(ad_key, moment$1(date, "YYYY-MM-DD").format("YYYY-MM-DD"), $this, true);
              }
            } else if (Object.keys($this.calculate_months).length != 1 && ad_key != 0 && ad_key != $this.all_dates.length - 1) {
              $this.selected_dates[ad_key].push(moment$1(date).format("DD"));
              $this.addAvailableDates(ad_key, moment$1(date, "YYYY-MM-DD").format("YYYY-MM-DD"), $this, true);
            }
          }
        });
      });
    },
    // generates selected dates for daily event
    generateDaily() {
      var $this = this;
      this.all_dates.forEach(function(ad_value, ad_key) {
        var schedules_dates = [];
        var tmp = null;
        var month = null;
        if ($this.schedules[ad_key].repetitive_dates == null)
          return true;
        JSON.parse($this.schedules[ad_key].repetitive_dates.split(",")).forEach(function(v, k) {
          month = moment$1($this.schedules[ad_key].from_date).format("YYYY-MM");
          tmp = moment$1(month + "-" + v).format("YY-MM-DD");
          schedules_dates[k] = moment$1(tmp, "YY-MM-DD").format("DD");
        });
        var all_dates_number = [];
        ad_value.forEach(function(v, k) {
          if (ad_key == 0 && Object.keys($this.calculate_months).length != 1) {
            let previousDay = moment$1().locale("en").subtract(1, "days").format("YYYY-MM-DD");
            if (moment$1($this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment$1(v).locale("en").format("YYYY-MM-DD") || previousDay == moment$1(v).locale("en").format("YYYY-MM-DD"))
              all_dates_number[k] = moment$1(v).format("DD");
          } else if (ad_key == $this.all_dates.length - 1 && Object.keys($this.calculate_months).length != 1) {
            if (moment$1($this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment$1(v).locale("en").format("YYYY-MM-DD"))
              all_dates_number[k] = moment$1(v).format("DD");
          } else if (Object.keys($this.calculate_months).length == 1) {
            if (moment$1($this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment$1(v).locale("en").format("YYYY-MM-DD") && moment$1($this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment$1(v).locale("en").format("YYYY-MM-DD")) {
              all_dates_number[k] = moment$1(v).format("DD");
            }
          } else if (Object.keys($this.calculate_months).length != 1 && ad_key != 0 && ad_key != $this.all_dates.length - 1) {
            all_dates_number[k] = moment$1(v).format("DD");
          }
        });
        $this.available_dates[ad_key] = [];
        let difference = all_dates_number.filter(function(x) {
          if (!schedules_dates.includes(x)) {
            $this.addAvailableDates(ad_key, x, $this);
            return true;
          }
        });
        $this.selected_dates[ad_key] = [];
        $this.selected_dates[ad_key] = difference;
      });
    },
    // generates selected dates for weekly event
    generateWeekly() {
      var $this = this;
      this.all_dates.forEach(function(ad_value, ad_key) {
        var schedules_dates = [];
        if ($this.schedules[ad_key].repetitive_days == null)
          return true;
        $this.schedules[ad_key].repetitive_days.split(",").forEach(function(v, k) {
          if (Number(v) == 1)
            schedules_dates[k] = "Sunday";
          if (Number(v) == 2)
            schedules_dates[k] = "Monday";
          if (Number(v) == 3)
            schedules_dates[k] = "Tuesday";
          if (Number(v) == 4)
            schedules_dates[k] = "Wednesday";
          if (Number(v) == 5)
            schedules_dates[k] = "Thursday";
          if (Number(v) == 6)
            schedules_dates[k] = "Friday";
          if (Number(v) == 7)
            schedules_dates[k] = "Saturday";
        });
        $this.selected_dates[ad_key] = [];
        ad_value.forEach(function(date, key) {
          if (schedules_dates.includes(String(date.locale("en").format("dddd")))) {
            if (ad_key == 0 && Object.keys($this.calculate_months).length != 1) {
              let previousDay = moment$1().locale("en").subtract(1, "days").format("YYYY-MM-DD");
              let todayDate = moment$1().locale("en").format("YYYY-MM-DD");
              console.log(date.format("YYYY-MM-DD"), "date", moment$1($this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD"), moment$1(date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD"));
              if (moment$1($this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment$1(date).locale("en").format("YYYY-MM-DD") || previousDay == moment$1(date).locale("en").format("YYYY-MM-DD") || todayDate == moment$1(date).locale("en").format("YYYY-MM-DD"))
                $this.selected_dates[ad_key].push(date.format("DD"));
            } else if (ad_key == $this.all_dates.length - 1 && Object.keys($this.calculate_months).length != 1) {
              if (moment$1($this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment$1(date).locale("en").format("YYYY-MM-DD"))
                $this.selected_dates[ad_key].push(date.format("DD"));
            } else if (Object.keys($this.calculate_months).length == 1) {
              if (moment$1($this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment$1(date).locale("en").format("YYYY-MM-DD") && moment$1($this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment$1(date).locale("en").format("YYYY-MM-DD")) {
                $this.selected_dates[ad_key].push(date.format("DD"));
              }
            } else if (Object.keys($this.calculate_months).length != 1 && ad_key != 0 && ad_key != $this.all_dates.length - 1) {
              $this.selected_dates[ad_key].push(date.format("DD"));
            }
            $this.available_dates[ad_key] = [];
            $this.selected_dates[ad_key].forEach(function(ad_v, ad_k) {
              $this.available_dates[ad_key].push($this.checkSeatAvailability(moment$1($this.userTimezone($this.dateToFullDate(ad_v + " " + $this.schedules[ad_key].from_time, $this.schedules[ad_key].from_date), "dddd LL").format("dddd LL"), "dddd LL").format("YYYY-MM-DD"), $this));
            });
          }
        });
      });
      this.weekly();
    },
    // server time convert into local timezone
    convert_to_local_tz() {
      this.schedules.forEach((function(value, key) {
        this.local_from_date[key] = this.schedules[key].from_date;
        this.local_to_date[key] = this.schedules[key].to_date;
        this.local_from_time[key] = moment$1(this.schedules[key].from_time, "HH:mm:ss").format(date_format.vue_time_format);
        this.local_to_time[key] = moment$1(this.schedules[key].to_time, "HH:mm:ss").format(date_format.vue_time_format);
      }).bind(this));
      this.local_start_date = this.userTimezone(this.event.start_date + " " + this.event.start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
      this.local_end_date = this.userTimezone(this.event.end_date + " " + this.event.end_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
    },
    //single event
    singleEvent() {
      if (this.event.repetitive <= 0) {
        this.triggerSignleDay();
        this.add({
          booking_date: moment$1(this.event.start_date, "YYYY-MM-DD").locale("en").format("dddd LL"),
          booked_date_server: this.serverTimezone(
            moment$1(this.event.start_date, "YYYY-MM-DD").format("YYYY-MM-DD") + " " + this.event.start_time,
            "YYYY-MM-DD HH:mm:ss"
          ).format("YYYY-MM-DD"),
          start_time: this.userTimezone(
            moment$1(this.event.start_date, "YYYY-MM-DD").format("YYYY-MM-DD") + " " + this.event.start_time,
            "YYYY-MM-DD HH:mm:ss"
          ).locale("en").format("HH:mm:ss"),
          end_time: this.userTimezone(
            moment$1(this.event.end_date, "YYYY-MM-DD").format("YYYY-MM-DD") + " " + this.event.end_time,
            "YYYY-MM-DD HH:mm:ss"
          ).locale("en").format("HH:mm:ss")
        });
        this.$nextTick(() => {
          document.querySelectorAll('.schedule-info[data-selected="true"]').forEach((el) => {
            el.removeAttribute("data-selected");
          });
          const singleSchedule = document.querySelector(
            ".lgx-tab .schedule-info"
          );
          if (singleSchedule) {
            singleSchedule.setAttribute("data-selected", "true");
          }
        });
      }
    },
    // week number group for merger_schedule weekly
    weekly() {
      var $this = this;
      this.selected_dates.forEach(function(value, key) {
        $this.week_numbers[key] = [];
        value.forEach(function(val1, key1) {
          if (!$this.week_numbers[key].includes($this.userTimezone(moment$1($this.dateToFullDate(val1 + " " + $this.schedules[key].from_time, $this.schedules[key].from_date), "dddd LL").locale("en"), "dddd LL").locale("en").isoWeek())) {
            $this.week_numbers[key].push($this.userTimezone(moment$1($this.dateToFullDate(val1 + " " + $this.schedules[key].from_time, $this.schedules[key].from_date), "dddd LL").locale("en"), "dddd LL").locale("en").isoWeek());
          }
        });
      });
    },
    //weekly  first date merger_schedule weekly
    getWeekFirstDate(item2, selected_dates, schedules) {
      var $this = this;
      var tmp = [];
      selected_dates.forEach(function(selected_date, key) {
        if (item2 == moment$1($this.dateToFullDate(selected_date, schedules), "dddd LL").locale("en").isoWeek()) {
          tmp.push(moment$1($this.dateToFullDate(selected_date, schedules), "dddd LL").locale("en").format("dddd LL"));
        }
      });
      return tmp[0];
    },
    //weekly  last date merger_schedule weekly
    getWeekLastDate(item2, selected_dates, schedules) {
      var $this = this;
      var tmp = [];
      selected_dates.forEach(function(selected_date, key) {
        if (item2 == moment$1($this.dateToFullDate(selected_date, schedules), "dddd LL").locale("en").isoWeek()) {
          tmp.push(moment$1($this.dateToFullDate(selected_date, schedules), "dddd LL").locale("en").format("dddd LL"));
        }
      });
      return tmp[tmp.length - 1];
    },
    // live seat availability check
    checkSeatAvailability(schedule_date, $this) {
      if (typeof $this == "undefined")
        $this = this;
      if (moment$1(schedule_date, "YYYY-MM-DD").format("YYYY-MM-DD") < moment$1().format("YYYY-MM-DD")) {
        return true;
      }
      var total_capacity_temp = $this.total_capacity;
      var total_booked = 0;
      var return_val = true;
      if (total_capacity_temp > 0) {
        for (var index2 in $this.tickets) {
          var ticket_id = $this.tickets[index2].id;
          if (typeof $this.booked_tickets[ticket_id + "-" + schedule_date] != "undefined") {
            if ($this.booked_tickets[ticket_id + "-" + schedule_date].total_booked > 0) {
              total_booked += parseInt($this.booked_tickets[ticket_id + "-" + schedule_date].total_booked);
            }
          }
        }
      }
      if (total_booked > 0)
        return parseInt(total_capacity_temp) - parseInt(total_booked);
      return return_val;
    },
    addAvailableDates(ad_key, ad_v, $this, is_full_date) {
      if (typeof is_full_date == "undefined")
        $this.available_dates[ad_key].push($this.checkSeatAvailability(moment$1($this.dateToFullDate(ad_v + " " + $this.schedules[ad_key].from_time, $this.schedules[ad_key].from_date), "dddd LL").format("YYYY-MM-DD"), $this));
      else
        $this.available_dates[ad_key].push($this.checkSeatAvailability(ad_v, $this));
    },
    //  multiday day event
    triggerMultiDay(booking_date, booking_end_date, start_time, end_time) {
      return parent.location.hash = `${"/checkout?booking_date=" + booking_date + "&booking_end_date=" + booking_end_date + "&start_time=" + start_time + "&end_time=" + end_time}`;
    },
    //  Single day non-repetitive event
    triggerSignleDay() {
      const hash = location.hash;
      if (hash != "#/checkout") {
        parent.location.hash = "/checkout";
      }
    },
    triggerCheckout() {
      const hash = location.hash;
      if (hash) {
        const [hash2, query] = hash.split("#")[1].split("?");
        const params = Object.fromEntries(new URLSearchParams(query));
        if (hash == "#/checkout")
          document.getElementById("buy_ticket_btn").click();
        if (hash2 == "/checkout" && Object.keys(params).length > 0)
          this.selectDates(params.booking_date, params.booking_end_date, params.start_time, params.end_time);
      }
    },
    previousSlide(id) {
      let container = document.getElementById(id);
      this.sideScroll(container, "left", 25, 100, 10);
    },
    nextSlide(id) {
      let container = document.getElementById(id);
      this.sideScroll(container, "right", 25, 100, 10);
    },
    sideScroll(element, direction, speed, distance, step) {
      let scrollAmount = 0;
      let slideTimer = setInterval(function() {
        if (direction == "left") {
          element.scrollLeft -= step;
        } else {
          element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, speed);
    },
    navigateMonth(direction) {
      const newIndex = this.tab_active_index + direction;
      if (newIndex >= 0 && newIndex < this.calculate_months.length) {
        this.tab_active_index = newIndex;
        this.updateDates();
      }
    },
    updateDates() {
      console.log("Updating dates for index:", this.tab_active_index);
      this.selectDefaultDate();
    },
    selectDefaultDate() {
      const index2 = this.tab_active_index;
      if (!this.schedules[index2] || !this.selected_dates[index2] || this.selected_dates[index2].length === 0 || !this.available_dates[index2]) {
        console.warn("No valid dates or schedules available for index:", index2);
        return;
      }
      const today = moment$1().format("YYYY-MM-DD");
      const previousDay = moment$1().subtract(1, "days").format("YYYY-MM-DD");
      const validDateEntry = this.selected_dates[index2].find((date, i) => {
        if (!date) {
          return false;
        }
        const fullDate = moment$1(this.calculate_months[index2] + "-" + date, "YYYY-MM-DD").format("YYYY-MM-DD");
        const endDateTime = moment$1(
          this.calculate_months[index2] + "-" + date + " " + this.schedules[index2].to_time,
          "YYYY-MM-DD HH:mm:ss"
        ).format("YYYY-MM-DD");
        return (fullDate >= today || fullDate === previousDay) && this.available_dates[index2][i] && endDateTime >= today;
      });
      if (!validDateEntry) {
        console.warn("No valid date found for index:", index2);
        return;
      }
      const selectedDate = validDateEntry;
      this.selected_dates[index2].indexOf(selectedDate);
      const formattedDate = this.userTimezone1(
        this.calculate_months[index2] + "-" + selectedDate + " " + this.schedules[index2].from_time,
        "YYYY-MM-DD HH:mm:ss"
      ).locale("en").format("dddd LL");
      const startTime = this.changeTimeFormat(
        this.userTimezone1(
          moment$1(this.schedules[index2].from_date).format("YYYY-MM") + "-" + selectedDate + " " + this.schedules[index2].from_time,
          "YYYY-MM-DD HH:mm:ss"
        ).locale("en").format("HH:mm:ss")
      );
      const endTime = this.changeTimeFormat(
        this.userTimezone1(
          moment$1(this.schedules[index2].to_date).format("YYYY-MM") + "-" + selectedDate + " " + this.schedules[index2].to_time,
          "YYYY-MM-DD HH:mm:ss"
        ).locale("en").format("HH:mm:ss")
      );
      console.log(formattedDate, "formattedDate");
      console.log(startTime, "startTime");
      console.log(endTime, "endTime");
      try {
        if (this.event && this.event.merge_schedule == 1) {
          const lastValidIndex = [...this.selected_dates[index2]].map((date, i) => ({ date, i })).reverse().find(({ date, i }) => {
            if (!date) return false;
            const fullDate = moment$1(this.calculate_months[index2] + "-" + date, "YYYY-MM-DD").format("YYYY-MM-DD");
            const endDateTime = moment$1(
              this.calculate_months[index2] + "-" + date + " " + this.schedules[index2].to_time,
              "YYYY-MM-DD HH:mm:ss"
            ).format("YYYY-MM-DD");
            return (fullDate >= today || fullDate === previousDay) && this.available_dates[index2][i] && endDateTime >= today;
          });
          if (lastValidIndex) {
            const selectedDate2 = lastValidIndex.date;
            let formattedEndDate = this.userTimezone1(
              this.calculate_months[index2] + "-" + selectedDate2 + " " + this.schedules[index2].from_time,
              "YYYY-MM-DD HH:mm:ss"
            ).locale("en").format("dddd LL");
            if (this.event.repititive_schedule.length > 0) {
              if (this.event.repititive_schedule[0].repetitive_type == 2) {
                moment$1.updateLocale("en", {
                  week: {
                    dow: 1
                    // Monday as the start of the week
                  }
                });
                formattedEndDate = moment$1(formattedDate + " " + endTime, "dddd LL").endOf("week").locale("en").format("dddd LL");
              }
            }
            this.selectDates(formattedDate, formattedEndDate, startTime, endTime);
          } else {
            console.warn("No valid last date found for index:", index2);
          }
        } else {
          this.selectDates(formattedDate, formattedDate, startTime, endTime);
        }
      } catch (error) {
        console.error("Error selecting date:", error);
        this.selectDates(formattedDate, formattedDate, startTime, endTime);
      }
    },
    singleDefaultDate() {
      const endDateTime = moment$1(this.event.end_date, "YYYY-MM-DD").format("YYYY-MM-DD");
      const today = moment$1().format("YYYY-MM-DD");
      if (endDateTime < today)
        return;
      this.singleEvent();
    },
    // 🔄 Verificar e processar retentar pagamento
    checkRetryPayment() {
      try {
        const retryData = localStorage.getItem("mercadopago_retry_payment");
        if (retryData) {
          const data = JSON.parse(retryData);
          console.log("🔄 Retentar pagamento detectado:", data);
          localStorage.removeItem("mercadopago_retry_payment");
          setTimeout(() => {
            const ticketsSection = document.getElementById("buy-tickets");
            if (ticketsSection) {
              ticketsSection.scrollIntoView({ behavior: "smooth" });
            }
            if (window.app && window.app.$children[0]) {
              window.app.$children[0].$notify({
                group: "foo",
                title: "Retentar Pagamento",
                text: "Abrindo formulário de pagamento para o ingresso: " + data.ticket_title,
                type: "info"
              });
            }
          }, 500);
        }
      } catch (error) {
        console.error("Erro ao processar retentar pagamento:", error);
      }
    }
  },
  mounted() {
    Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (this.event.repetitive > 0)
      this.getEventSchedule();
    this.triggerCheckout();
    this.singleDefaultDate();
    this.checkRetryPayment();
  }
};
var _sfc_render$2 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "col-xs-12" }, [_vm.event.repetitive > 0 ? _c("div", [_c("div", { staticClass: "btn border-dark text-primary border-2 rounded-2 py-1 px-1 d-flex gap-1", staticStyle: { "width": "fit-content" } }, [_c("button", { staticClass: "arrow-btn", attrs: { "disabled": _vm.tab_active_index <= 0 }, on: { "click": function($event) {
    return _vm.navigateMonth(-1);
  } } }, [_c("i", { staticClass: "fa fa-chevron-left" })]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.tab_active_index, expression: "tab_active_index" }], staticClass: "form-control form-control-sm bg-transparent border-0 rounded-0 text-center fw-bold", staticStyle: { "width": "fit-content" }, on: { "change": [function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.tab_active_index = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  }, _vm.updateDates] } }, _vm._l(_vm.calculate_months, function(item, index2) {
    return _vm.schedules[index2].from_time != null && _vm.schedules[index2].to_time != null && (_vm.moment(_vm.moment(_vm.local_from_date[index2], "YYYY-MM-DD").format("MM YYYY"), "MM YYYY").isAfter(_vm.moment(_vm.moment().format("MM YYYY"), "MM YYYY")) || _vm.moment(_vm.moment(_vm.local_from_date[index2], "YYYY-MM-DD").format("MM YYYY"), "MM YYYY").isSame(_vm.moment(_vm.moment().format("MM YYYY"), "MM YYYY"))) ? _c("option", { key: index2, domProps: { "value": index2 } }, [_vm._v(" " + _vm._s(_vm.moment(_vm.local_from_date[index2], "YYYY-MM-DD").format("MMMM, YYYY")) + " ")]) : _vm._e();
  }), 0), _c("button", { staticClass: "arrow-btn", attrs: { "disabled": _vm.tab_active_index >= _vm.calculate_months.length - 1 }, on: { "click": function($event) {
    return _vm.navigateMonth(1);
  } } }, [_c("i", { staticClass: "fa fa-chevron-right" })])]), _vm.event.merge_schedule <= 0 ? _c("div", { staticClass: "tab-content v-scroll mh-30 p-3" }, [_vm._l(_vm.calculate_months, function(item, index2) {
    return _vm.schedules[index2].from_time != null && _vm.schedules[index2].to_time != null ? _c("div", { key: index2, staticClass: "tab-pane", class: { "active": index2 == _vm.tab_active_index } }, [parseInt(_vm.schedules[0].repetitive_type) != parseInt(2) ? _c("div", { staticClass: "row d-flex gap-2", attrs: { "role": "tablist", "aria-multiselectable": "true" } }, [_c("div", { staticClass: "col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer", on: { "click": function($event) {
      return _vm.previousSlide(`${"slideTicketsDWM_" + index2}`);
    } } }, [_c("i", { staticClass: "fa fa-chevron-left" })]), _c("a", { staticClass: "d-flex gap-2 text-dark h-scroll col-xl-10 col-lg-10 col-md-10 col-12 px-0 py-1 p-lg-0 flex-grow-1", attrs: { "role": "button", "data-toggle": "collapse", "aria-expanded": "true", "aria-controls": "collapseOne", "id": `${"slideTicketsDWM_" + index2}` } }, _vm._l(_vm.selected_dates[index2], function(selected_date, index1) {
      return _c("div", { key: index1, staticClass: "d-flex justify-content-between flex-wrap lgx-single-schedule", class: {
        "expired-event": _vm.userTimezone1(item + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss"),
        "outofstock-event": !_vm.available_dates[index2][index1],
        "schedule-active": _vm.booked_date_server === _vm.moment(item + "-" + selected_date).format("YYYY-MM-DD")
      } }, [_c("div", { staticClass: "card p-3 py-2 border border-2 border-dark pointer rounded-1 schedule-info", on: { "click": function($event) {
        !(_vm.userTimezone1(item + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && _vm.available_dates[index2][index1] ? _vm.selectDates(
          _vm.userTimezone1(_vm.dateToFullDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), "dddd LL").format("dddd LL"),
          false,
          _vm.changeTimeFormat(_vm.userTimezone1(_vm.moment(_vm.schedules[index2].from_date).format("YYYY-MM") + "-" + selected_date + " " + _vm.schedules[index2].from_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss")),
          _vm.changeTimeFormat(_vm.userTimezone1(_vm.moment(_vm.schedules[index2].to_date).format("YYYY-MM") + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss"))
        ) : null;
      } } }, [_c("p", { staticClass: "m-0 text-dark text-xs" }, [_vm._v(_vm._s(_vm.userTimezone1(_vm.dateToShortDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), _vm.date_format.vue_date_format).format("ddd")))]), _c("p", { staticClass: "m-0 text-dark lh-1 h5 text-bolder" }, [_vm._v(_vm._s(_vm.userTimezone1(_vm.dateToShortDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), _vm.date_format.vue_date_format).format("DD")))]), _vm.userTimezone1(item + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss") ? _c("small", { staticClass: "text-danger font-size-p7" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.ended")))])]) : _vm._e(), !(_vm.userTimezone1(item + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && !_vm.available_dates[index2][index1] ? _c("small", { staticClass: "text-danger font-size-p7" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.sold")))])]) : _vm._e()])]);
    }), 0), _c("div", { staticClass: "col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer m-position", on: { "click": function($event) {
      return _vm.nextSlide(`${"slideTicketsDWM_" + index2}`);
    } } }, [_c("i", { staticClass: "fa fa-chevron-right" })])]) : _c("div", { staticClass: "row d-flex gap-2", attrs: { "role": "tablist", "aria-multiselectable": "true" } }, [_c("div", { staticClass: "col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer", on: { "click": function($event) {
      return _vm.previousSlide(`${"slideTicketsWeekly_" + index2}`);
    } } }, [_c("i", { staticClass: "fa fa-chevron-left" })]), _c("a", { staticClass: "d-flex gap-2 text-dark h-scroll col-xl-10 col-lg-10 col-md-10 col-12 px-0 py-1 p-lg-0 flex-grow-1", attrs: { "role": "button", "data-toggle": "collapse", "aria-expanded": "true", "aria-controls": "collapseOne", "id": `${"slideTicketsWeekly_" + index2}` } }, _vm._l(_vm.selected_dates[index2], function(selected_date, index1) {
      return _c("div", { key: index1, class: {
        "expired-event": _vm.userTimezone(item + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss"),
        "outofstock-event": !_vm.available_dates[index2][index1]
      } }, [_c("div", { staticClass: "d-flex justify-content-between flex-wrap lgx-single-schedule", on: { "click": function($event) {
        !(_vm.userTimezone(item + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && _vm.available_dates[index2][index1] ? _vm.selectDates(
          _vm.userTimezone(_vm.dateToFullDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), "dddd LL").format("dddd LL"),
          false,
          _vm.changeTimeFormat(_vm.userTimezone(_vm.moment(_vm.schedules[index2].from_date).format("YYYY-MM") + "-" + selected_date + " " + _vm.schedules[index2].from_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss")),
          _vm.changeTimeFormat(_vm.userTimezone(_vm.moment(_vm.schedules[index2].to_date).format("YYYY-MM") + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss"))
        ) : null;
      } } }, [_c("div", { staticClass: "card p-3 py-2 border border-2 border-dark pointer rounded-1 schedule-info" }, [_c("p", { staticClass: "m-0 text-dark text-xs" }, [_vm._v(_vm._s(_vm.userTimezone(_vm.dateToShortDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), _vm.date_format.vue_date_format).format("ddd")))]), _c("p", { staticClass: "m-0 text-dark lh-1 h5 text-bolder" }, [_vm._v(_vm._s(_vm.userTimezone(_vm.dateToShortDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), _vm.date_format.vue_date_format).format("DD")))]), _vm.userTimezone(item + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss") ? _c("small", { staticClass: "text-danger font-size-p7" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.ended")))])]) : _vm._e(), !(_vm.userTimezone(item + "-" + selected_date + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && !_vm.available_dates[index2][index1] ? _c("small", { staticClass: "text-danger font-size-p7" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.sold")) + " ")])]) : _vm._e()])])]);
    }), 0), _c("div", { staticClass: "col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer m-position", on: { "click": function($event) {
      return _vm.nextSlide(`${"slideTicketsWeekly_" + index2}`);
    } } }, [_c("i", { staticClass: "fa fa-chevron-right" })])])]) : _vm._e();
  }), _vm.booked_date_server != null ? _c("div", { staticClass: "single-schedule mt-3 d-w-m" }, [_c("div", { staticClass: "schedule-row d-inline-flex align-items-center bg-primary flex-wrap gap-2" }, [_c("div", { staticClass: "schedule-col schedule-date" }, [_c("div", { staticClass: "fw-bold text-light" }, [_vm._v(" " + _vm._s(_vm.moment(_vm.booked_date_server).format("DD MMM YYYY") || _vm.trans("em.select_a_date")) + " ")])]), _vm._m(0), _c("div", { staticClass: "schedule-col schedule-time text-end" }, [_c("div", { staticClass: "badge bg-light text-dark" }, [_vm._v(" " + _vm._s(_vm.start_time) + " " + _vm._s(_vm.end_time) + " " + _vm._s(_vm.showTimezone()) + " ")])])])]) : _vm._e()], 2) : _vm._e(), _vm.event.merge_schedule > 0 && parseInt(_vm.schedules[0].repetitive_type) == parseInt(3) ? _c("div", { staticClass: "tab-content v-scroll mh-30 p-3 pb-4" }, _vm._l(_vm.calculate_months, function(item, index2) {
    return _c("div", { key: index2, staticClass: "tab-pane", class: { "active": index2 == _vm.tab_active_index } }, [_c("div", { staticClass: "row is-relative", attrs: { "role": "tablist", "aria-multiselectable": "true" } }, [_c("a", { staticClass: "d-flex gap-2 text-dark h-scroll col-xl-10 col-lg-10 col-md-10 col-12 px-0 py-1 p-lg-0 flex-grow-1", attrs: { "role": "button", "data-toggle": "collapse", "aria-expanded": "true", "aria-controls": "collapseOne" } }, [_c("div", { staticClass: "d-flex justify-content-between flex-wrap shadow-sm mb-2 lgx-single-schedule ms-2", class: {
      "expired-event": _vm.userTimezone1(item + "-" + _vm.selected_dates[index2][_vm.selected_dates[index2].length - 1] + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss"),
      "outofstock-event": !_vm.available_dates[index2][0],
      "schedule-active": _vm.booked_date_server === _vm.moment(item + "-" + _vm.selected_dates[index2][0]).format("YYYY-MM-DD")
    }, on: { "click": function($event) {
      !(_vm.userTimezone1(item + "-" + _vm.selected_dates[index2][_vm.selected_dates[index2].length - 1] + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && _vm.available_dates[index2][0] ? _vm.selectDates(
        _vm.userTimezone1(_vm.dateToFullDate(_vm.selected_dates[index2][0] + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), "dddd LL").format("dddd LL"),
        _vm.userTimezone1(_vm.dateToFullDate(_vm.selected_dates[index2][_vm.selected_dates[index2].length - 1] + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), "dddd LL").format("dddd LL"),
        _vm.changeTimeFormat(_vm.userTimezone1(_vm.moment(_vm.schedules[index2].from_date).format("YYYY-MM") + "-" + _vm.selected_dates[index2][0] + " " + _vm.schedules[index2].from_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss")),
        _vm.changeTimeFormat(_vm.userTimezone1(_vm.moment(_vm.schedules[index2].to_date).format("YYYY-MM") + "-" + _vm.selected_dates[index2][0] + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss"))
      ) : null;
    } } }, [_c("div", { staticClass: "card p-3 py-2 border border-2 border-dark pointer rounded-1 card-body schedule-info" }, [_vm.userTimezone1(item + "-" + _vm.selected_dates[index2][_vm.selected_dates[index2].length - 1] + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss") ? _c("small", { staticClass: "text-danger font-size-p7" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.ended")))])]) : _vm._e(), !(_vm.userTimezone1(item + "-" + _vm.selected_dates[index2][_vm.selected_dates[index2].length - 1] + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && !_vm.available_dates[index2][0] ? _c("small", { staticClass: "text-danger font-size-p7" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.sold")))])]) : _vm._e(), _c("div", { staticClass: "d-flex justify-content-start gap-2 align-self-center" }, _vm._l(_vm.selected_dates[index2], function(selected_date, index22) {
      return _c("div", { key: index22 }, [_c("p", { staticClass: "m-0 text-dark text-xs" }, [_vm._v(" " + _vm._s(_vm.userTimezone1(_vm.dateToShortDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), _vm.date_format.vue_date_format).format("ddd")) + " ")]), _c("p", { staticClass: "m-0 text-dark lh-1 h5 text-bolder" }, [_vm._v(" " + _vm._s(_vm.userTimezone1(_vm.dateToShortDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), _vm.date_format.vue_date_format).format("DD")) + " ")])]);
    }), 0)])])]), _vm.booked_date_server != null ? _c("div", { staticClass: "monthly-timing" }, [_c("div", { staticClass: "schedule-row d-inline-flex align-items-center justify-content-center" }, [_c("div", [_c("div", { staticClass: "badge bg-dark text-light rounded-1" }, [_vm._v(" " + _vm._s(_vm.trans("em.timings")) + "  " + _vm._s(_vm.start_time) + " - " + _vm._s(_vm.end_time) + " " + _vm._s(_vm.showTimezone()) + " ")])])])]) : _vm._e()])]);
  }), 0) : _vm._e(), _vm.event.merge_schedule > 0 && parseInt(_vm.schedules[0].repetitive_type) == parseInt(2) ? _c("div", { staticClass: "tab-content v-scroll mh-30 p-3 pb-5" }, _vm._l(_vm.calculate_months, function(item, index2) {
    return _vm.schedules[index2].from_time != null && _vm.schedules[index2].to_time != null ? _c("div", { key: index2, staticClass: "tab-pane", class: { "active": index2 == _vm.tab_active_index } }, [_c("div", { staticClass: "row d-flex gap-2 is-relative", attrs: { "role": "tablist", "aria-multiselectable": "true" } }, [_c("div", { staticClass: "col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer", on: { "click": function($event) {
      return _vm.previousSlide(`${"slideTicketsDWM_" + index2}`);
    } } }, [_c("i", { staticClass: "fa fa-chevron-left" })]), _c("a", { staticClass: "d-flex gap-2 text-dark h-scroll col-xl-10 col-lg-10 col-md-10 col-12 px-0 py-1 p-lg-0 flex-grow-1", attrs: { "role": "button", "data-toggle": "collapse", "aria-expanded": "true", "aria-controls": "collapseOne", "id": `${"slideTicketsDWM_" + index2}` } }, _vm._l(_vm.week_numbers[index2], function(item2, index22) {
      return _c("div", { key: index22, staticClass: "card border-0 shadow-sm mb-2 lgx-single-schedule", class: {
        "expired-event": _vm.moment(_vm.moment(_vm.getWeekLastDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date)).format("YYYY-MM-DD") + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss"),
        "outofstock-event": !_vm.checkSeatAvailability(_vm.moment(_vm.getWeekFirstDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date)).format("YYYY-MM-DD")),
        "schedule-active": _vm.booked_date_server === _vm.moment(_vm.getWeekFirstDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date)).format("YYYY-MM-DD")
      }, on: { "click": function($event) {
        !(_vm.moment(_vm.moment(_vm.getWeekLastDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date)).format("YYYY-MM-DD") + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && _vm.checkSeatAvailability(_vm.moment(_vm.getWeekFirstDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date)).format("YYYY-MM-DD")) ? _vm.selectDates(
          _vm.getWeekFirstDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date),
          _vm.getWeekLastDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date),
          _vm.changeTimeFormat(_vm.userTimezone(_vm.moment(_vm.schedules[index2].from_date).format("YYYY-MM") + "-" + _vm.selected_dates[index2] + " " + _vm.schedules[index2].from_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss")),
          _vm.changeTimeFormat(_vm.userTimezone(_vm.moment(_vm.schedules[index2].to_date).format("YYYY-MM") + "-" + _vm.selected_dates[index2] + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss"))
        ) : null;
      } } }, [_c("div", { staticClass: "card p-3 py-2 border border-2 border-dark pointer rounded-1 schedule-info" }, [_c("div", { staticClass: "d-flex justify-content-start gap-1 align-self-center" }, _vm._l(_vm.selected_dates[index2], function(selected_date, index3) {
        return item2 == _vm.moment(_vm.userTimezone(_vm.dateToFullDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), "dddd LL").format("dddd LL"), "dddd LL").isoWeek() ? _c("div", { key: index3 }, [_c("p", { staticClass: "m-0 text-dark text-xs" }, [_vm._v(_vm._s(_vm.userTimezone(_vm.dateToShortDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), _vm.date_format.vue_date_format).format("ddd")))]), _c("p", { staticClass: "m-0 text-dark lh-1 h5 text-bolder" }, [_vm._v(_vm._s(_vm.userTimezone(_vm.dateToShortDate(selected_date + " " + _vm.schedules[index2].from_time, _vm.schedules[index2].from_date), _vm.date_format.vue_date_format).format("DD")))])]) : _vm._e();
      }), 0), _c("small", { staticClass: "text-danger font-size-p7" }, [_vm.moment(_vm.moment(_vm.getWeekLastDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date)).format("YYYY-MM-DD") + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss") ? _c("span", [_vm._v(_vm._s(_vm.trans("em.ended")))]) : _c("span", [_vm._v(" ")])]), !(_vm.moment(_vm.moment(_vm.getWeekLastDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date)).format("YYYY-MM-DD") + " " + _vm.schedules[index2].to_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && !_vm.checkSeatAvailability(_vm.moment(_vm.getWeekFirstDate(item2, _vm.selected_dates[index2], _vm.schedules[index2].from_date)).format("YYYY-MM-DD")) ? _c("small", { staticClass: "text-danger font-size-p7" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.sold")))])]) : _vm._e()])]);
    }), 0), _vm.booked_date_server != null ? _c("div", { staticClass: "ms-lg-3 weekly-timing" }, [_c("div", { staticClass: "schedule-row d-inline-flex align-items-center justify-content-center" }, [_c("div", [_c("div", { staticClass: "badge bg-dark text-light rounded-1" }, [_vm._v(" " + _vm._s(_vm.trans("em.timings")) + "  " + _vm._s(_vm.start_time) + " - " + _vm._s(_vm.end_time) + " " + _vm._s(_vm.showTimezone()) + " ")])])])]) : _vm._e(), _c("div", { staticClass: "col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer m-position", on: { "click": function($event) {
      return _vm.nextSlide(`${"slideTicketsDWM_" + index2}`);
    } } }, [_c("i", { staticClass: "fa fa-chevron-right" })])])]) : _vm._e();
  }), 0) : _vm._e(), _vm.booked_date_server != null && _vm.event.merge_schedule > 0 ? _c("div", { staticClass: "single-schedule w alert alert-primary bg-primary mt-lg-1" }, [_c("div", { staticClass: "fw-bold text-light" }, [_c("i", { staticClass: "fas fa-check-circle" }), _vm._v(" " + _vm._s(_vm.trans("em.seasonal_ticket_info")))])]) : _vm._e()]) : _vm._e(), _vm.event.repetitive <= 0 ? _c("div", { staticClass: "single-schedule" }, [_c("div", { staticClass: "schedule-row d-inline-flex align-items-center bg-primary flex-wrap gap-2", attrs: { "id": "buy_ticket_btn" }, on: { "click": function($event) {
    !(_vm.moment(_vm.event.end_date + " " + _vm.event.end_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && _vm.checkSeatAvailability(_vm.moment(_vm.event.start_date, "YYYY-MM-DD").format("YYYY-MM-DD")) ? _vm.singleEvent() : null;
  } } }, [_c("div", { staticClass: "schedule-col schedule-date" }, [_c("div", { staticClass: "fw-bold text-light" }, [_vm._v(" " + _vm._s(_vm.convert_date_to_local_format(_vm.userTimezone(_vm.event.start_date + " " + _vm.event.start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD"))) + " ")])]), _c("div", { staticClass: "schedule-col schedule-status text-center" }, [_vm.moment(_vm.event.end_date + " " + _vm.event.end_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss") ? _c("div", { staticClass: "badge bg-danger" }, [_vm._v(_vm._s(_vm.trans("em.ended")))]) : !(_vm.moment(_vm.event.end_date + " " + _vm.event.end_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && !_vm.checkSeatAvailability(_vm.moment(_vm.event.start_date, "YYYY-MM-DD").format("YYYY-MM-DD")) ? _c("div", { staticClass: "badge bg-danger" }, [_vm._v(_vm._s(_vm.trans("em.out_of_stock")))]) : !(_vm.moment(_vm.event.end_date + " " + _vm.event.end_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") < _vm.moment().format("YYYY-MM-DD HH:mm:ss")) && _vm.positiveInteger(_vm.checkSeatAvailability(_vm.moment(_vm.event.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"))) ? _c("div", { staticClass: "badge bg-warning text-dark" }, [_vm._v(_vm._s(_vm.trans("em.filling_fast")))]) : _vm._e()]), _c("div", { staticClass: "schedule-col schedule-time text-end" }, [_c("div", { staticClass: "badge bg-light text-dark" }, [_vm._v(" " + _vm._s(_vm.userTimezone(_vm.event.start_date + " " + _vm.event.start_time, "YYYY-MM-DD HH:mm:ss").format(_vm.date_format.vue_time_format)) + " - " + _vm._s(_vm.userTimezone(_vm.event.end_date + " " + _vm.event.end_time, "YYYY-MM-DD HH:mm:ss").format(_vm.date_format.vue_time_format)) + " " + _vm._s(_vm.showTimezone()) + " ")])])])]) : _vm._e(), _vm.booking_date && _vm.start_time && _vm.end_time ? _c("ticket-component", { attrs: { "event": _vm.event, "tickets": _vm.tickets, "max_ticket_qty": _vm.max_ticket_qty, "currency": _vm.currency, "login_user_id": _vm.login_user_id, "is_admin": _vm.is_admin, "is_organiser": _vm.is_organiser, "is_customer": _vm.is_customer, "is_paypal": _vm.is_paypal, "is_mercadopago": _vm.is_mercadopago, "is_offline_payment_organizer": _vm.is_offline_payment_organizer, "is_offline_payment_customer": _vm.is_offline_payment_customer, "booked_tickets": _vm.booked_tickets } }) : _vm._e()], 1);
};
var _sfc_staticRenderFns$2 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "schedule-col schedule-status text-center" }, [_c("span")]);
}];
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  "36979118"
);
const SelectDates = __component__$2.exports;
const _sfc_main$1 = {
  mixins: [mixinsFilters],
  props: ["gimages"],
  data() {
    return {
      images: [],
      index: null,
      isPaused: false
    };
  },
  computed: {
    doubledImages() {
      return [...this.images, ...this.images];
    }
  },
  mounted() {
    this.gimages.forEach((value) => {
      this.images.push(this.getImageUrl ? this.getImageUrl(value) : value);
    });
    this.addKeyboardListeners();
  },
  beforeDestroy() {
    this.removeKeyboardListeners();
  },
  methods: {
    pause() {
      this.isPaused = true;
    },
    resume() {
      this.isPaused = false;
    },
    openGallery(imageIndex) {
      this.index = imageIndex;
      document.body.style.overflow = "hidden";
    },
    closeGallery() {
      this.index = null;
      document.body.style.overflow = "";
    },
    nextImage() {
      if (this.images.length > 1) {
        this.index = (this.index + 1) % this.images.length;
      }
    },
    previousImage() {
      if (this.images.length > 1) {
        this.index = this.index === 0 ? this.images.length - 1 : this.index - 1;
      }
    },
    addKeyboardListeners() {
      this.keydownHandler = (e) => {
        if (this.index !== null) {
          switch (e.key) {
            case "Escape":
              this.closeGallery();
              break;
            case "ArrowRight":
              this.nextImage();
              break;
            case "ArrowLeft":
              this.previousImage();
              break;
          }
        }
      };
      document.addEventListener("keydown", this.keydownHandler);
    },
    removeKeyboardListeners() {
      if (this.keydownHandler) {
        document.removeEventListener("keydown", this.keydownHandler);
      }
    }
  }
};
var _sfc_render$1 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "infinite-carousel-wrapper", on: { "mouseenter": _vm.pause, "mouseleave": _vm.resume } }, [_c("div", { ref: "track", staticClass: "infinite-carousel-track", style: { animationPlayState: _vm.isPaused ? "paused" : "running" } }, _vm._l(_vm.doubledImages, function(image, idx) {
    return _c("div", { key: idx, staticClass: "carousel-image" }, [_c("img", { staticClass: "w-100", attrs: { "src": image }, on: { "click": function($event) {
      return _vm.openGallery(idx % _vm.images.length);
    } } })]);
  }), 0)]), _vm.index !== null ? _c("div", { staticClass: "gallery-popup-overlay", on: { "click": _vm.closeGallery } }, [_c("div", { staticClass: "gallery-popup-content", on: { "click": function($event) {
    $event.stopPropagation();
  } } }, [_c("button", { staticClass: "gallery-close-btn", on: { "click": _vm.closeGallery } }, [_c("i", { staticClass: "fas fa-times" })]), _vm.images.length > 1 ? _c("button", { staticClass: "gallery-nav-btn gallery-prev-btn", on: { "click": _vm.previousImage } }, [_c("i", { staticClass: "fas fa-chevron-left" })]) : _vm._e(), _vm.images.length > 1 ? _c("button", { staticClass: "gallery-nav-btn gallery-next-btn", on: { "click": _vm.nextImage } }, [_c("i", { staticClass: "fas fa-chevron-right" })]) : _vm._e(), _c("div", { staticClass: "gallery-image-container" }, [_c("img", { staticClass: "gallery-main-image", attrs: { "src": _vm.images[_vm.index] }, on: { "click": _vm.nextImage } })]), _c("div", { staticClass: "gallery-counter" }, [_vm._v(" " + _vm._s(_vm.index + 1) + " / " + _vm._s(_vm.images.length) + " ")]), _vm.images.length > 1 ? _c("div", { staticClass: "gallery-thumbnails" }, _vm._l(_vm.images, function(image, imageIndex) {
    return _c("div", { key: imageIndex, staticClass: "gallery-thumbnail", class: { "active": imageIndex === _vm.index }, on: { "click": function($event) {
      _vm.index = imageIndex;
    } } }, [_c("img", { staticClass: "thumbnail-image", attrs: { "src": image } })]);
  }), 0) : _vm._e()])]) : _vm._e()]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null
);
const GalleryImages = __component__$1.exports;
const _sfc_main = {
  props: ["lat", "lng"],
  data() {
    return {
      center: { lat: this.lat ? parseFloat(this.lat) : 27.1751448, lng: this.lng ? parseFloat(this.lng) : 78.0399535 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  computed: {
    google: vueGoogleMapsExports.gmapApi
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    }
  }
};
var _sfc_render = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("gmap-map", { staticStyle: { "width": "100%", "height": "400px" }, attrs: { "center": _vm.center, "zoom": 12 } }, [_c("GmapMarker", { ref: "myMarker", attrs: { "position": _vm.google && new _vm.google.maps.LatLng(_vm.center) } })], 1)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null
);
const GComponent = __component__.exports;
window.Vuex = index;
Vue.use(index);
Vue.component("v-select", vSelect);
Vue.use(VueGoogleMaps, {
  load: {
    key: google_map_key,
    libraries: "places"
  },
  installComponents: true
});
const store = new index.Store({
  state: {
    tickets: [],
    booking_date: null,
    booking_end_date: null,
    start_time: null,
    end_time: null,
    booked_date_server: null
  },
  mutations: {
    add(state, { tickets, booking_date, start_time, end_time, booking_end_date, booked_date_server }) {
      if (typeof booking_date !== "undefined") {
        state.booking_date = booking_date;
      }
      if (typeof booking_end_date !== "undefined") {
        state.booking_end_date = booking_end_date;
      }
      if (typeof start_time !== "undefined") {
        state.start_time = start_time;
      }
      if (typeof end_time !== "undefined") {
        state.end_time = end_time;
      }
      if (typeof tickets !== "undefined") {
        state.tickets = tickets;
      }
      if (typeof booked_date_server !== "undefined") {
        state.booked_date_server = booked_date_server;
      }
    },
    update(state, { tickets }) {
      if (typeof tickets !== "undefined") {
        if (tickets.length > 1)
          state.tickets.push(...tickets);
        else
          state.tickets.push(tickets);
      }
    }
  }
});
window.app = new Vue({
  el: "#eventmie_app",
  store,
  components: {
    SelectDates,
    GalleryImages,
    GComponent
  }
});
//# sourceMappingURL=index-TZHIf99I.js.map
