/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { UncommonProcessesData } from '../../graphql/types';
import { FrameworkRequest, RequestOptions } from '../framework';
import { Hit, Hits, HostHits, SearchHit, TotalHit } from '../types';

export interface UncommonProcessesAdapter {
  getUncommonProcesses(
    req: FrameworkRequest,
    options: RequestOptions
  ): Promise<UncommonProcessesData>;
}

type StringOrNumber = string | number;
export interface UncommonProcessHit extends Hit {
  total: TotalHit;
  host: Array<{ id: string; name: string }>;
  _source: {
    '@timestamp': string;
    process: {
      name: string;
      title: string;
    };
  };
  cursor: string;
  sort: StringOrNumber[];
}

export type ProcessHits = Hits<TotalHit, UncommonProcessHit>;

export interface UncommonProcessBucket {
  key: string;
  hosts: {
    buckets: Array<{ key: string; host: HostHits }>;
  };
  process: ProcessHits;
}

export interface UncommonProcessData extends SearchHit {
  sort: string[];
  aggregations: {
    process_count: {
      value: number;
    };
    group_by_process: {
      after_key: string;
      buckets: UncommonProcessBucket[];
    };
  };
}
