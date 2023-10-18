/**
 * Polkadot/Substrate uses a variety of numeric types in its API,
 * including signed and unsigned integers of various sizes (8, 16, 32, 64, 128 bits).
 * Returns the minimum and maximum values for a given type.
 *
 * This function provides a way to determine the valid range of values for each of these types.
 * The type is expected to be a string representing a binary number type, such as 'i8', 'u16', etc.
 * The function returns a tuple of two bigints representing the minimum and maximum values for the type.
 *
 * @param {string} type - The type to get the min and max values for.
 * @returns {[bigint, bigint]} - A tuple containing the min and max values.
 *
 * @example
 * const [min, max] = getMinMax('i8');
 * console.log(min); // -128n
 * console.log(max); // 127n
 *
 * getMinMax function can be used to ensure that the value is between -128 and 127.
 */
export function getMinMax(type: string): [bigint, bigint] {
  switch (type) {
    case 'i8':
      return [-128n, 127n]
    case 'i16':
      return [-32768n, 32767n]
    case 'i32':
      return [-2147483648n, 2147483647n]
    case 'i64':
      return [-9223372036854775808n, 9223372036854775807n]
    case 'i128':
      return [
        -170141183460469231731687303715884105728n,
        170141183460469231731687303715884105727n
      ]
    case 'u8':
      return [0n, 255n]
    case 'u16':
      return [0n, 65535n]
    case 'u32':
      return [0n, 4294967295n]
    case 'u64':
      return [0n, 18446744073709551615n]
    case 'u128':
      return [0n, 340282366920938463463374607431768211455n]
    default:
      return [-BigInt(Number.MAX_SAFE_INTEGER), BigInt(Number.MAX_SAFE_INTEGER)]
  }
}
